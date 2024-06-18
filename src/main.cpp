#include <Arduino.h>
#include "WiFi.h"
#include "esp_camera.h"
#include "camera_pins.h"

const char *ssid = "Airtel_swap_4913";
const char *password = "air21116";

String serverName = "192.168.1.6";
const int serverPort = 3000;
String serverPath = "/upload";
String fileName = "ESP32-001";

const int pictureInterval = 60000; // time between each image (in milliseconds)
unsigned long latestPicture = 0;

camera_config_t config;
int camera_init_fail = 0;

WiFiClient client;

void setup()
{
  Serial.begin(115200);
  pinMode(LED_GPIO_NUM, OUTPUT);

  WiFi.begin(ssid, password);
  WiFi.setSleep(false);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Wifi Connected");

  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.frame_size = FRAMESIZE_HD;
  config.jpeg_quality = 1;
  config.fb_count = 2;

  esp_err_t err = esp_camera_init(&config);

  if (err != ESP_OK)
  {
    camera_init_fail = 1;
    Serial.printf("Camera init failed with error 0x%x", err);
    Serial.println("");
  }

  sensor_t *s = esp_camera_sensor_get();
  if (s->id.PID == OV3660_PID)
  {
    s->set_vflip(s, 1);
    s->set_brightness(s, 1);
    s->set_saturation(s, -2);
  }
  s->set_framesize(s, FRAMESIZE_QVGA);
}

void loop()
{


  if (!camera_init_fail)
  {
    digitalWrite(LED_GPIO_NUM, HIGH);
    Serial.println("Taking picture ...");

    camera_fb_t *fb = esp_camera_fb_get();

    digitalWrite(LED_GPIO_NUM, LOW);


    Serial.println("Took a picture of size: ");
    Serial.println(fb->len);

    if (client.connect(serverName.c_str(), serverPort))
    {

      Serial.println("Connection successful!");
      String boundary = "--MK--";
      String head = "--" + boundary + "\r\nContent-Disposition: form-data; name=\"image\"; filename=\"" + fileName + ".jpg\"\r\nContent-Type: image/jpeg\r\n\r\n";
      String tail = "\r\n--" + boundary + "--\r\n";

      uint32_t imageLen = fb->len;
      uint32_t totalLen = imageLen + head.length() + tail.length();

      Serial.println("Sending Image...");

      client.println("POST " + serverPath + " HTTP/1.1");
      client.println("Host: " + serverName);
      client.println("Content-Length: " + String(totalLen));
      client.println("Content-Type: multipart/form-data; boundary=" + boundary);
      client.println();
      client.print(head);

      uint8_t *fbBuf = fb->buf;
      size_t fbLen = fb->len;
      size_t bufferSize = 1024;
      for (size_t n = 0; n < fbLen; n += bufferSize)
      {
        size_t remaining = fbLen - n;
        size_t chunkSize = remaining < bufferSize ? remaining : bufferSize;
        client.write(fbBuf + n, chunkSize);
      }
      client.print(tail);

      esp_camera_fb_return(fb);

    }
  }
  else
  {
    Serial.println("Camera failed to init");
  }

  delay(4000);
}