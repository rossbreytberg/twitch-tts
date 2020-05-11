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
using namespace winrt::Windows::Foundation;
using namespace winrt::Windows::Media::Core;
using namespace winrt::Windows::Media::Playback;
using namespace winrt::Windows::Media::SpeechSynthesis;
using namespace winrt::Windows::Storage::Streams;

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
      winrt::apartment_context ui_thread;
      SpeechSynthesizer synthesizer = SpeechSynthesizer();
      SpeechSynthesisStream audioStream = co_await synthesizer.SynthesizeTextToStreamAsync(text);
      co_await ui_thread;
      MediaPlayer mediaPlayer = MediaPlayer();
      mediaPlayer.AudioCategory(MediaPlayerAudioCategory::Communications);
      mediaPlayer.Source(MediaSource::CreateFromStream(
        audioStream,
        audioStream.ContentType()
      ));
      MediaPlayerElement mediaPlayerElement = MediaPlayerElement();
      mediaPlayerElement.SetMediaPlayer(mediaPlayer);
      Window::Current().Content(mediaPlayerElement);
      mediaPlayer.Play();
      OnSpeak(0);
    }
  };
}