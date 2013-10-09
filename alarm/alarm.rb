require 'packetfu'

capture = PacketFu::Capture.new(:start => true, :iface => 'eth0', :filter => 'tcp', :promisc => true)

def pload_has(payload, word)
    bword = word.each_byte.map { |b| sprintf(" 0x%02x ",b) }.join
    if payload.downcase.include? word
        return true
    elsif payload.downcase.include? bword
        return true
    end
    return false
end

def alerts(alert_num, output, ip_source, protocol)
    puts "#{alert_num}. ALERT: #{output} #{ip_source} (#{protocol})!"
end

alert_num = 1

capture.stream.each do |p|
	pkt = PacketFu::Packet.parse p
	pload = pkt.payload
	if pkt.is_ip?
        if pkt.is_tcp?
            # NULL SCAN
            if pkt.tcp_flags.to_i == 0
                alerts(alert_num, "Null Scan detected from", pkt.ip_saddr, pkt.proto.last)
                alert_num += 1
            # XMAS TREE SCAN
            elsif pkt.tcp_flags.to_i == 41
                alerts(alert_num, "Xmas Tree Scan detected from", pkt.ip_saddr, pkt.proto.last)
                alert_num += 1
            end
        end

        # NMAP SCAN (other)
        if pload_has(pload, "nmap")
                alerts(alert_num, "Nmap Scan detected from", pkt.ip_saddr, pkt.proto.last)
                alert_num += 1
        # PASSWORD LEAK
        elsif pload_has(pload, "pass")
                alerts(alert_num, "Password leaked in the clear from", pkt.ip_saddr, pkt.proto.last)
                alert_num += 1
        # CREDIT CARD LEAK (dash delimited)
        elsif /\d{4}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?\d{4}/.match(pload) || /\d{4}(\s|-)?\d{6}(\s|-)?\d{5}/.match(pload)
                alerts(alert_num, "Credit card leaked in the clear (high risk) from", pkt.ip_saddr, pkt.proto.last)
                alert_num += 1
        # CREDIT CARD LEAK (space delimited)
        elsif /\d{4}(\s|" ")?\d{4}(\s|" ")?\d{4}(\s|" ")?\d{4}/.match(pload) || /\d{4}(\s|" ")?\d{6}(\s|" ")?\d{5}/.match(pload)
                alerts(alert_num, "Credit card leaked in the clear (moderate risk) from", pkt.ip_saddr, pkt.proto.last)
                alert_num += 1
        # CREDIT CARD LEAK (non delimited)
        elsif /(\s|" ")\d{16}(\s|" ")/.match(pload) || /(\s|" ")\d{15}(\s|" ")/.match(pload)
                alerts(alert_num, "Credit card leaked in the clear (low risk) from", pkt.ip_saddr, pkt.proto.last)
                alert_num += 1
        # XXS ATTACK
        elsif pload_has(pload, "<script>") && pload_has(pload, "</script>") && (pload_has(pload, "window.location") || pload_has(pload, "alert"))
                alerts(alert_num, "Possible XSS detected from", pkt.ip_saddr, pkt.proto.last)
                alert_num += 1
        end
    end
end
