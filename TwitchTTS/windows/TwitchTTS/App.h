#pragma once

#include "App.xaml.g.h"
#include "NativeModules/TextToSpeech.h"



namespace winrt::TwitchTTS::implementation
{
    struct App : AppT<App>
    {
        App() noexcept;
    };
} // namespace winrt::TwitchTTS::implementation


