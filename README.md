# InstaNFT CAM


esptool.py --chip esp32 --port /dev/ttyUSB0 --baud 115200 write_flash -z \
    0x1000 /home/atmegabuzz/Documents/PlatformIO/Projects/InstaNFT/.pio/build/esp-wrover-kit/bootloader.bin \
    0x8000 /home/atmegabuzz/Documents/PlatformIO/Projects/InstaNFT/.pio/build/esp-wrover-kit/partitions.bin \
    0x10000 /home/atmegabuzz/Documents/PlatformIO/Projects/InstaNFT/server/output.bin