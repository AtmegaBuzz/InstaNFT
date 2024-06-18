<p><img src="https://github.com/AtmegaBuzz/InstaNFT/assets/68425016/5e828375-21a8-458f-b34c-9638000faaae" alt="logo" width="30%" /></p>


## Demo
![Demo Video](https://youtu.be/N9f028EOvnw)

## Overview

The Camera-NFT project introduces a novel approach to NFT creation by embedding unique cryptographic identities into custom-built camera devices. These identities ensure the authenticity of NFTs created from personal photos or captured moments at Web3 events. Using advanced cryptography and an integrated ERC721 Lua script, users can easily convert photos into NFTs on AO (Assured Origin), making the process seamless and verifiable. This project aims to bridge the gap between physical photography and digital ownership in the Web3 ecosystem, offering a new way to capture and monetize personal moments securely.

Project aims to revolutionize the creation and verification of NFTs (Non-Fungible Tokens) using a custom-built camera device. This device is equipped with unique cryptographic identities that ensure the authenticity and origin of NFTs created from personal pictures or captured moments at Web3 events.

## Motivation 
I am excited about Arweave and AO because they give us the tools to create and verify NFTs in a whole new way. Arweave stores our NFTs permanently and securely, while AO's hyper-parallel computing lets us scale up our operations like never before. Together, they're helping us build a platform that's fun, secure, and cutting-edge for minting and enjoying digital art and memories.

## Key Features

- **Cryptographic Identities:** Each camera device is endowed with a unique identity using cryptography and firmware embedding on AO (Assured Origin). This identity allows for the verification of NFT origins directly from the device using its unique signatures.
  
- **Technical Specifications:**
  - **Elliptic Curve:** Secp2561k is used for generating signatures, utilizing a 32-bit machine ID (machine private key).
  - **Integration:** Implemented ERC721 Lua script enables easy conversion of personal images into NFTs on AO.
  - **Hardware:** The camera device is built on the **AI Thinker ESP32** Cam Board.

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

## Architecture
![image](https://github.com/AtmegaBuzz/InstaNFT/assets/68425016/202e0ea0-beb5-4d80-b2f4-a8d209e20b5f)

## Flashing the attested bin
```
esptool.py --chip esp32 --port /dev/ttyUSB0 --baud 115200 write_flash -z \
    0x1000 /home/atmegabuzz/Documents/PlatformIO/Projects/InstaNFT/.pio/build/esp-wrover-kit/bootloader.bin \
    0x8000 /home/atmegabuzz/Documents/PlatformIO/Projects/InstaNFT/.pio/build/esp-wrover-kit/partitions.bin \
    0x10000 /home/atmegabuzz/Documents/PlatformIO/Projects/InstaNFT/server/output.bin
```


## Contact

For questions or inquiries, please contact [AtmegaBuzz](https://x.com/a_kraken_head).

