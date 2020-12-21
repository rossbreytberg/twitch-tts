#pragma once

#include "App.xaml.g.h"

#include "NativeModules/TextToSpeech.h"

namespace activation = winrt::Windows::ApplicationModel::Activation;

namespace winrt::TwitchTTS::implementation
{
    struct App : AppT<App>
    {
        App() noexcept;
        void OnLaunched(activation::LaunchActivatedEventArgs const&);
        void OnSuspending(IInspectable const&, Windows::ApplicationModel::SuspendingEventArgs const&);
        void OnNavigationFailed(IInspectable const&, Windows::UI::Xaml::Navigation::NavigationFailedEventArgs const&);
      private:
        using super = AppT<App>;
    };
} // namespace winrt::TwitchTTS::implementation


