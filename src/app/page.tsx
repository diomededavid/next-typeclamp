'use client';

import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"

interface FormValues {
    baseSize: string;
    exampleRequired: string;
    typeScale: string;
}

export default function Home() {
    const [formData, setFormData] = useState<FormValues | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            baseSize: "16",
            typeScale: "1.125"
        }
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        setFormData(data);
    };

    console.log(watch("baseSize")); // you can watch individual input by pass the name of the input

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>Common values</legend>
                    <label>Base size (px)</label>
                    <input {...register("baseSize")} defaultValue="16"/>


                    <label>Scale</label>
                    <div className="custom-select">
                        <select {...register("typeScale")}>
                            <option value="1.125">Major Second</option>
                            <option value="1.25">Major Third</option>
                            <option value="1.133">Perfect Fourth</option>
                            <option value="1.618">Golden Ratio</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Typography</legend>
                    <input type="submit"/>
                </fieldset>
            </form>
            {formData && (
                <div className="text-white">
                    <h2>Form Data</h2>
                    <p>Example: {Number(formData.baseSize) * Number(formData.typeScale)}</p>
                    <p>Type Scale: {formData.typeScale}</p>
                </div>
            )}

        </div>
    );
}
