import React from 'react';
import { ui, icons } from '@/index';
interface HotelLoaderProps {
  step?: number;
}

export const HotelLoader = ({ step = 1 }: HotelLoaderProps) => {
  const steps = [
    { id: 1, label: 'Parsing search parameters', icon: icons.Search },
    { id: 2, label: 'Loading cities and companies', icon: icons.Building2 },
    { id: 3, label: 'Searching available hotels', icon: icons.Hotel },
    { id: 4, label: 'Finalizing results', icon: icons.Sparkles },
  ];

  const progress = (step / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-linear-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center z-50 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#785ef7] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#644ed4] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#8b7af8] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <ui.Card className="max-w-md w-full shadow-2xl border-0 relative backdrop-blur-sm bg-white/95">
        <ui.CardContent className="p-6">
          {/* GIF and Header */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-linear-to-r from-[#785ef7] to-[#644ed4] rounded-full blur-lg opacity-40 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-2 shadow-lg">
                <img
                  src="/gifs/cotravloader.gif"
                  alt="Loading"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-[#785ef7] to-[#644ed4] bg-clip-text text-transparent mb-1">
              Finding Perfect Hotels
            </h2>
            <p className="text-gray-600 text-xs">
              Searching the best deals for you
            </p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-2 mb-5">
            {steps.map((item) => {
              const isCompleted = item.id < step;
              const isCurrent = item.id === step;
              const IconComponent = item.icon;

              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                    isCurrent
                      ? 'bg-linear-to-r from-[#785ef7]/10 to-[#644ed4]/10'
                      : isCompleted
                      ? 'bg-green-50/50'
                      : 'bg-gray-50/50'
                  }`}
                >
                  {/* Step Indicator */}
                  <div className="shrink-0">
                    {isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-linear-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-sm">
                        <icons.CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-8 h-8 rounded-full bg-linear-to-r from-[#785ef7] to-[#644ed4] flex items-center justify-center shadow-sm animate-pulse">
                        <icons.Loader2 className="w-5 h-5 text-white animate-spin" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs font-semibold">
                        {item.id}
                      </div>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <IconComponent className={`w-4 h-4 shrink-0 ${
                      isCurrent
                        ? 'text-[#785ef7]'
                        : isCompleted
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`} />
                    <p
                      className={`text-xs font-medium transition-colors ${
                        isCurrent
                          ? 'text-gray-900 font-semibold'
                          : isCompleted
                          ? 'text-green-700'
                          : 'text-gray-400'
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-gray-600 font-medium">
                Step {step} of {steps.length}
              </span>
              <span className="text-transparent bg-linear-to-r from-[#785ef7] to-[#644ed4] bg-clip-text font-semibold">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <ui.Progress value={progress} className="h-2 bg-gray-200 [&>div]:bg-linear-to-r [&>div]:from-[#785ef7] [&>div]:to-[#644ed4]"  />
          </div>
        </ui.CardContent>
      </ui.Card>
    </div>
  );
}