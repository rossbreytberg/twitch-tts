#pragma once

#include <functional>
#include <string>
#include "pch.h"
#include "winrt/Windows.Foundation.h"
#include "winrt/Windows.Media.Playback.h"
#include "winrt/Windows.Media.SpeechSynthesis.h"
#include "NativeModules.h"

using namespace winrt;
using namespace winrt::Windows::Foundation;
using namespace winrt::Windows::Media::Playback;
using namespace winrt::Windows::Media::SpeechSynthesis;

namespace TwitchTTS
{
  REACT_MODULE(TextToSpeech)
  struct TextToSpeech {
 
    REACT_METHOD(speak);
    void speak(std::wstring text) noexcept
    {
      SpeakImpl(hstring(text));
    }

    REACT_EVENT(OnSpeak);
    std::function<void(double)> OnSpeak;

    IAsyncAction SpeakImpl(hstring text) noexcept {
      winrt::apartment_context foreground_thread;
      SpeechSynthesizer synthesizer = SpeechSynthesizer();
      SpeechSynthesisStream audioStream = co_await synthesizer.SynthesizeTextToStreamAsync(text);
      MediaPlayer mediaPlayer = MediaPlayer();
      mediaPlayer.AudioCategory(MediaPlayerAudioCategory::Communications);
      mediaPlayer.Play();
      OnSpeak(0);
    }
  };
}