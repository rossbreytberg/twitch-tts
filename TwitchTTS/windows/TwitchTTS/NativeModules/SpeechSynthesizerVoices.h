#pragma once

#include <functional>
#include <string>
#include "pch.h"
#include "winrt/Windows.Foundation.h"
#include "winrt/Windows.Media.Core.h"
#include "winrt/Windows.Media.Playback.h"
#include "winrt/Windows.Media.SpeechSynthesis.h"
#include "winrt/Windows.Storage.Streams.h"
#include "NativeModules.h"

using namespace winrt;
using namespace winrt::Microsoft::ReactNative;
using namespace winrt::Windows::Foundation;
using namespace winrt::Windows::Foundation::Collections;
using namespace winrt::Windows::Media::Core;
using namespace winrt::Windows::Media::Playback;
using namespace winrt::Windows::Media::SpeechSynthesis;
using namespace winrt::Windows::Storage::Streams;

namespace TwitchTTS
{
  REACT_MODULE(SpeechSynthesizerVoices)
  struct SpeechSynthesizerVoices {
 
    REACT_METHOD(getAllVoices);
    void getAllVoices(ReactPromise<JSValueArray> &&result) noexcept
    {
      SpeechSynthesizer synthesizer = SpeechSynthesizer();
      JSValueArray voices = JSValueArray{};
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