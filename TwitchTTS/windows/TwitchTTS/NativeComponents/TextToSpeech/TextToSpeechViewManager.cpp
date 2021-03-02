#include "pch.h"
#include "winrt/Windows.Devices.Enumeration.h"
#include "winrt/Windows.Foundation.h"
#include "winrt/Windows.Media.Core.h"
#include "winrt/Windows.Media.Playback.h"
#include "winrt/Windows.Media.SpeechSynthesis.h"
#include "winrt/Windows.Storage.Streams.h"
#include "winrt/Windows.UI.Core.h"
#include "winrt/Windows.UI.Xaml.h"
#include "winrt/Windows.UI.Xaml.Controls.h"
#include "JSValueReader.h"
#include "NativeModules.h"
#include "TextToSpeechViewManager.h"

using namespace winrt;
using namespace winrt::TwitchTTS::implementation;
using namespace winrt::Windows::Devices::Enumeration;
using namespace winrt::Windows::Foundation;
using namespace winrt::Windows::Media::Core;
using namespace winrt::Windows::Media::Playback;
using namespace winrt::Windows::Media::SpeechSynthesis;
using namespace winrt::Windows::Storage::Streams;
using namespace winrt::Windows::UI::Core;
using namespace winrt::Windows::UI::Xaml;
using namespace winrt::Windows::UI::Xaml::Controls;

namespace winrt::TwitchTTS::implementation {

  // IViewManager

  hstring TextToSpeechViewManager::Name() noexcept {
    return L"TextToSpeech";
  }

  FrameworkElement TextToSpeechViewManager::CreateView() noexcept {
    m_uiDispatcher = CoreWindow::GetForCurrentThread().Dispatcher();
    MediaPlayerElement mediaPlayerElement = MediaPlayerElement();
    m_mediaPlayer = MediaPlayer();
    mediaPlayerElement.SetMediaPlayer(m_mediaPlayer);
    m_mediaPlayer.MediaEnded([&, mediaPlayerElement](MediaPlayer mediaPlayer, IInspectable value) {
      m_uiDispatcher.RunAsync(CoreDispatcherPriority::Normal, [&, mediaPlayerElement]() {
        ReactContext().DispatchEvent(mediaPlayerElement, L"topEnd", nullptr);
      });
    });
    return mediaPlayerElement;
  }

  // IViewManagerWithReactContext

  IReactContext TextToSpeechViewManager::ReactContext() noexcept {
    return m_reactContext;
  }

  void TextToSpeechViewManager::ReactContext(IReactContext reactContext) noexcept {
    m_reactContext = reactContext;
  }

  // IViewManagerWithNativeProperties

  IMapView<hstring, ViewManagerPropertyType> TextToSpeechViewManager::NativeProps() noexcept {
    auto nativeProps = single_threaded_map<hstring, ViewManagerPropertyType>();
    nativeProps.Insert(L"audioOutputID", ViewManagerPropertyType::String);
    nativeProps.Insert(L"paused", ViewManagerPropertyType::String);
    nativeProps.Insert(L"text", ViewManagerPropertyType::String);
    nativeProps.Insert(L"voiceID", ViewManagerPropertyType::String);
    nativeProps.Insert(L"volume", ViewManagerPropertyType::Number);
    return nativeProps.GetView();
  }

  void TextToSpeechViewManager::UpdateProperties(
    FrameworkElement const &view,
    IJSValueReader const &propertyMapReader) noexcept {
    if (auto element = view.try_as<MediaPlayerElement>()) {
      const JSValueObject &propertyMap = JSValue::ReadObjectFrom(propertyMapReader);
      hstring audioOutputID;
      hstring text;
      hstring voiceID;
      double volume = 1;
      bool paused = true;
      for (auto const &pair : propertyMap) {
        auto const &propertyName = pair.first;
        auto const &propertyValue = pair.second;
        if (propertyName == "audioOutputID") {
          audioOutputID = to_hstring(propertyValue.AsJSString());
        }
        else if (propertyName == "paused") {
          paused = propertyValue.AsJSBoolean();
        }
        else if (propertyName == "text") {
          text = to_hstring(propertyValue.AsJSString());
        }
        else if (propertyName == "voiceID") {
          voiceID = to_hstring(propertyValue.AsJSString());
        }
        else if (propertyName == "volume") {
          volume = propertyValue.AsJSNumber();
        }
      }
      if (!text.empty() && !paused) {
        Speak(text, voiceID, audioOutputID, volume);
      } else if (paused == true) {
        m_mediaPlayer.Pause();
      }
      else if (paused == false) {
        m_mediaPlayer.Play();
      }
    }
  }

  IAsyncAction TextToSpeechViewManager::Speak(
    hstring const text,
    hstring const voiceID,
    hstring const audioOutputID,
    double const volume
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
    if (!audioOutputID.empty()) {
      DeviceInformationCollection devices = co_await DeviceInformation::FindAllAsync(DeviceClass::AudioRender);
      for (DeviceInformation const deviceInfo : devices) {
        if (deviceInfo.Id() == audioOutputID) {
          m_mediaPlayer.AudioDevice(deviceInfo);
          break;
        }
      }
    }
    m_mediaPlayer.Source(MediaSource::CreateFromStream(audioStream, audioStream.ContentType()));
    m_mediaPlayer.Volume(volume);
    m_mediaPlayer.Play();
  }

  // IViewManagerWithExportedEventTypeConstants

  ConstantProviderDelegate TextToSpeechViewManager::ExportedCustomBubblingEventTypeConstants() noexcept {
    return nullptr;
  }

  ConstantProviderDelegate TextToSpeechViewManager::ExportedCustomDirectEventTypeConstants() noexcept {
    return [](IJSValueWriter const& constantWriter) {
      WriteCustomDirectEventTypeConstant(constantWriter, "End");
    };
  }
}