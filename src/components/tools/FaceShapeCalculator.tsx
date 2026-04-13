import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const FaceShapeCalculator = () => {
    const [measurements, setMeasurements] = useState({
        forehead: '',
        cheekbones: '',
        jawline: '',
        faceLength: ''
    });
    const [result, setResult] = useState<string | null>(null);

    const handleCalculate = () => {
        // Basic logic for demonstration (placeholder)
        // Replace with actual geometric logic from the "Vibecoding" plan
        setResult("Rostro Diamante (Simulación)");
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4">
                <label className="block">
                    <span className="text-neutral-600 font-medium">Ancho de Frente (cm)</span>
                    <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm p-3 border"
                        placeholder="Ej: 15"
                        value={measurements.forehead}
                        onChange={(e) => setMeasurements({ ...measurements, forehead: e.target.value })}
                    />
                </label>
                <label className="block">
                    <span className="text-neutral-600 font-medium">Ancho de Pómulos (cm)</span>
                    <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm p-3 border"
                        placeholder="Ej: 16"
                        value={measurements.cheekbones}
                        onChange={(e) => setMeasurements({ ...measurements, cheekbones: e.target.value })}
                    />
                </label>
                <label className="block">
                    <span className="text-neutral-600 font-medium">Ancho de Mandíbula (cm)</span>
                    <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm p-3 border"
                        placeholder="Ej: 14"
                        value={measurements.jawline}
                        onChange={(e) => setMeasurements({ ...measurements, jawline: e.target.value })}
                    />
                </label>
                <label className="block">
                    <span className="text-neutral-600 font-medium">Largo del Rostro (cm)</span>
                    <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm p-3 border"
                        placeholder="Ej: 20"
                        value={measurements.faceLength}
                        onChange={(e) => setMeasurements({ ...measurements, faceLength: e.target.value })}
                    />
                </label>
            </div>

            <Button onClick={handleCalculate} className="w-full bg-brand-primary hover:bg-brand-black text-white font-bold h-12">
                Calcular Geometría
            </Button>

            {result && (
                <div className="mt-6 p-4 bg-neutral-100 border border-neutral-300 rounded-lg text-center">
                    <h4 className="font-serif text-xl font-bold text-brand-black mb-2">Tu Rostro es:</h4>
                    <p className="text-2xl text-brand-primary font-bold">{result}</p>
                </div>
            )}
        </div>
    );
};

export default FaceShapeCalculator;
