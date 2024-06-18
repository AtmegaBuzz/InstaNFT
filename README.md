# AO CAM InstaNFT

## Overview

The Camera-NFT project aims to revolutionize the creation and verification of NFTs (Non-Fungible Tokens) using a custom-built camera device. This device is equipped with unique cryptographic identities that ensure the authenticity and origin of NFTs created from personal pictures or captured moments at Web3 events.

## Key Features

- **Cryptographic Identities:** Each camera device is endowed with a unique identity using cryptography and firmware embedding on AO (Assured Origin). This identity allows for the verification of NFT origins directly from the device using its unique signatures.
  
- **Technical Specifications:**
  - **Elliptic Curve:** Secp2561k is used for generating signatures, utilizing a 32-bit machine ID (machine private key).
  - **Integration:** Implemented ERC721 Lua script enables easy conversion of personal images into NFTs on AO.
  - **Hardware:** The camera device is built on the AI Thinker ESP32 Cam Board.

## Getting Started

To start using the Camera-NFT project:

1. **Setup the Camera Device:**
   - Install necessary firmware and libraries on the AI Thinker ESP32 Cam Board.
   - Configure the device with your unique cryptographic keys.

2. **Capture Photos:**
   - Use the camera to capture photos either for personal use or at Web3 events.

3. **Create NFTs:**
   - Utilize the provided ERC721 Lua script to mint NFTs directly from the captured images on AO.

## Usage

- **Minting NFTs:** Execute the ERC721 Lua script on AO to convert your photos into NFTs.
- **Verification:** Verify the authenticity of NFTs by checking their origin using device signatures.


## Flashing the attested bin
```
esptool.py --chip esp32 --port /dev/ttyUSB0 --baud 115200 write_flash -z \
    0x1000 /home/atmegabuzz/Documents/PlatformIO/Projects/InstaNFT/.pio/build/esp-wrover-kit/bootloader.bin \
    0x8000 /home/atmegabuzz/Documents/PlatformIO/Projects/InstaNFT/.pio/build/esp-wrover-kit/partitions.bin \
    0x10000 /home/atmegabuzz/Documents/PlatformIO/Projects/InstaNFT/server/output.bin
```

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or inquiries, please contact [Your Name](mailto:your-email@example.com).

