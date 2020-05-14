#pragma once

#include "pch.h"

using namespace winrt;
using namespace winrt::Microsoft::ReactNative;
using namespace winrt::Windows::Foundation::Collections;
using namespace winrt::Windows::UI::Xaml;

namespace winrt::TwitchTTS::implementation {
  struct TextToSpeechViewManager : implements<
    TextToSpeechViewManager,
    IViewManager,
    IViewManagerWithNativeProperties> {

    public:
      TextToSpeechViewManager() = default;

    // IViewManager

    hstring Name() noexcept;

    FrameworkElement CreateView() noexcept;

    // IViewManagerWithNativeProperties

    IMapView<hstring, ViewManagerPropertyType> NativeProps() noexcept;

    void UpdateProperties(
      FrameworkElement const& view,
      IJSValueReader const& propertyMapReader) noexcept;
  };
}