#pragma once

#include "pch.h"

using namespace winrt;
using namespace winrt::Microsoft::ReactNative;
using namespace winrt::Windows::Foundation;
using namespace winrt::Windows::Foundation::Collections;
using namespace winrt::Windows::Media::Playback;
using namespace winrt::Windows::UI::Core;
using namespace winrt::Windows::UI::Xaml;

namespace winrt::TwitchTTS::implementation {
  struct TextToSpeechViewManager : implements<
    TextToSpeechViewManager,
    IViewManager,
    IViewManagerWithReactContext,
    IViewManagerWithNativeProperties,
    IViewManagerWithExportedEventTypeConstants> {

    public:
      TextToSpeechViewManager() = default;

      // IViewManager

      hstring Name() noexcept;

      FrameworkElement CreateView() noexcept;

      // IViewManagerWithReactContext

      IReactContext ReactContext() noexcept;

      void ReactContext(IReactContext reactContext) noexcept;

      // IViewManagerWithNativeProperties

      IMapView<hstring, ViewManagerPropertyType> NativeProps() noexcept;

      void UpdateProperties(
        FrameworkElement const &view,
        IJSValueReader const &propertyMapReader) noexcept;

      // IViewManagerWithExportedEventTypeConstants

      ConstantProviderDelegate ExportedCustomBubblingEventTypeConstants() noexcept;

      ConstantProviderDelegate ExportedCustomDirectEventTypeConstants() noexcept;

    private:
      IReactContext m_reactContext{ nullptr };
      CoreDispatcher m_uiDispatcher = nullptr;
      IAsyncAction Speak(
        MediaPlayer const mediaPlayer,
        hstring const text,
        hstring const voiceID,
        hstring const audioOutputID) noexcept;
  };
}