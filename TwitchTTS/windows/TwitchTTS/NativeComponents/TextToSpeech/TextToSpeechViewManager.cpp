#include "pch.h"
#include "winrt/Windows.Foundation.h"
#include "winrt/Windows.Media.Core.h"
#include "winrt/Windows.Media.Playback.h"
#include "winrt/Windows.Media.SpeechSynthesis.h"
#include "winrt/Windows.Storage.Streams.h"
#include "winrt/Windows.UI.Xaml.h"
#include "winrt/Windows.UI.Xaml.Controls.h"
#include "JSValueReader.h"
#include "NativeModules.h"
#include "TextToSpeechViewManager.h"

using namespace winrt;
using namespace winrt::TwitchTTS::implementation;
using namespace winrt::Windows::Foundation;
using namespace winrt::Windows::Media::Core;
using namespace winrt::Windows::Media::Playback;
using namespace winrt::Windows::Media::SpeechSynthesis;
using namespace winrt::Windows::Storage::Streams;
using namespace winrt::Windows::UI::Xaml;
using namespace winrt::Windows::UI::Xaml::Controls;

namespace winrt::TwitchTTS::implementation {

  // IViewManager

  hstring TextToSpeechViewManager::Name() noexcept {
    return L"TextToSpeech";
  }

  FrameworkElement TextToSpeechViewManager::CreateView() noexcept {
    return MediaPlayerElement();
  }

  // IViewManagerWithNativeProperties

  IMapView<hstring, ViewManagerPropertyType> TextToSpeechViewManager::NativeProps() noexcept {
    auto nativeProps = single_threaded_map<hstring, ViewManagerPropertyType>();
    nativeProps.Insert(L"text", ViewManagerPropertyType::String);
    return nativeProps.GetView();
  }

  void TextToSpeechViewManager::UpdateProperties(
    FrameworkElement const &view,
    IJSValueReader const &propertyMapReader) noexcept {
    if (auto element = view.try_as<MediaPlayerElement>()) {
      const JSValueObject &propertyMap = JSValue::ReadObjectFrom(propertyMapReader);
      hstring text;
      hstring voiceID;
      for (auto const &pair : propertyMap) {
        auto const &propertyName = pair.first;
        auto const &propertyValue = pair.second;
        if (propertyName == "text") {
          text = to_hstring(propertyValue.AsJSString());
        }
        else if (propertyName == "voiceID") {
          voiceID = to_hstring(propertyValue.AsJSString());
        }
      }
      if (!text.empty()) {
        MediaPlayer mediaPlayer = MediaPlayer();
        element.SetMediaPlayer(mediaPlayer);
        Speak(mediaPlayer, text, voiceID);
      }
    }
  }

  IAsyncAction TextToSpeechViewManager::Speak(
    MediaPlayer const mediaPlayer,
    hstring const text,
    hstring const voiceID
  ) noexcept {
    SpeechSynthesizer synthesizer = SpeechSynthesizer();
    if (!voiceID.empty()) {
      for (VoiceInformation const voiceInfo : synthesizer.AllVoices()) {
        if (voiceInfo.Id() == voiceID) {
          synthesizer.Voice(voiceInfo);
          break;
        }
      }
    }
    SpeechSynthesisStream audioStream = co_await synthesizer.SynthesizeTextToStreamAsync(text);
    mediaPlayer.Source(MediaSource::CreateFromStream(audioStream, audioStream.ContentType()));
    mediaPlayer.Play();
  }
}