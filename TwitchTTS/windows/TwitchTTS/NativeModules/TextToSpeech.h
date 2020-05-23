#pragma once

#include "pch.h"
#include "winrt/Windows.Devices.Enumeration.h"
#include "winrt/Windows.Media.SpeechSynthesis.h"
#include "NativeModules.h"

using namespace winrt;
using namespace winrt::Microsoft::ReactNative;
using namespace winrt::Windows::Devices::Enumeration;
using namespace winrt::Windows::Media::SpeechSynthesis;

namespace TwitchTTS
{
  REACT_MODULE(TextToSpeech)
  struct TextToSpeech {
 
    REACT_METHOD(getAudioOutputs)
    fire_and_forget getAudioOutputs(ReactPromise<JSValueArray> result) noexcept
    {
      JSValueArray audioOutputs = JSValueArray{};
      DeviceInformationCollection devices = co_await DeviceInformation::FindAllAsync(DeviceClass::AudioRender);
      for (DeviceInformation const& deviceInfo : devices) {
        audioOutputs.push_back(JSValueObject{
          {"id", to_string(deviceInfo.Id())},
          {"name", to_string(deviceInfo.Name())}
        });
      }
      result.Resolve(audioOutputs);
    }

    REACT_METHOD(getVoices);
    void getVoices(ReactPromise<JSValueArray> &&result) noexcept
    {
      JSValueArray voices = JSValueArray{};
      SpeechSynthesizer synthesizer = SpeechSynthesizer();
      for (VoiceInformation const& voiceInfo : synthesizer.AllVoices()) {
        voices.push_back(JSValueObject{
          {"id", to_string(voiceInfo.Id())},
          {"name", to_string(voiceInfo.DisplayName())}
         });
      }
      result.Resolve(voices);
    }
  };
}