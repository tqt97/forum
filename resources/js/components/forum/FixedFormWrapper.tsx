import React from 'react';

interface FixedFormWrapperProps {
    header: React.ReactNode;
    main: React.ReactNode;
    button: React.ReactNode;
}

export default function FixedFormWrapper({ header, main, button }: FixedFormWrapperProps) {
    return (
        <div className="max-w-7xl1 fixed bottom-0 mx-auto w-full space-y-3 border-t-4 border-gray-100 bg-white p-6">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div>{header}</div>
                <div className="mt-4">
                    {main}
                    <div className="mt-4">{button}</div>
                </div>
            </div>
        </div>
    );
}
