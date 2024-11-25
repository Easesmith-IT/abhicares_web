import React from 'react'

const ProgressTracker = ({steps, currentStep}) => {
    return (
        <div className="progress-tracker">
            {steps?.map((step, index) => (
                <div key={index} className="step">
                    <div
                        className={`circle ${index <= currentStep ? "active" : ""}`}
                    >
                        {index <= currentStep ? "✔" : ""}
                    </div>
                    <span className="label">{step}</span>
                    {index < steps.length - 1 && (
                        <div
                            className={`line ${index < currentStep ? "active" : ""}`}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ProgressTracker