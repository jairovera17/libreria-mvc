top -bn1 | grep "Cpu(s)" | \
           sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | \
           awk '{printf "%d,",(100 - $1)}'

iostat | grep "sda" | \
    awk '{printf "%d,%d,%d,",$2,$3,$4}'


free -m| grep "Mem:" | awk '{printf "%d,",$3}'

ifstat | grep wlp8s0 | awk '{printf "%d,%d",$2,$4}'

