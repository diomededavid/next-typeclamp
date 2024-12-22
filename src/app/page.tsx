'use client';

import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import DOMPurify from "dompurify"

enum TypeScaleEnum {
    MajorSecond = 1.125,
    MajorThird = 1.25,
    PerfectFourth = 1.333,
    GoldenRatio = 1.618
}

interface FormValues {
    baseSize: string;
    exampleRequired: string;
    typeScale: TypeScaleEnum;
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
            typeScale: TypeScaleEnum.MajorSecond,
            sampleText: "TypeClamp"
        }
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        setFormData(data);
    };

    console.log(watch("baseSize")); // you can watch individual input by pass the name of the input
const arr   =   new Array(5);
    arr.fill(0);

    const sampleText = String(formData?.sampleText) ;
    const headings = arr.map((_, index) => `<h${index + 1}>${sampleText}</h${index + 1}>`);
    const result = headings.join('\n');
    const sanitizedData = () => ({
        __html: DOMPurify.sanitize(result)
    })

    return (
        <div>
            <h1>TypeClamp</h1>
            <div className="grid grid-cols-2 gap-4 my-5">
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
                    <label>Sample Text</label>
                   <input {...register("sampleText")} defaultValue="16"/>
                </fieldset>
                <fieldset>
                    <legend>Typography</legend>
                    <input type="submit"/>
                </fieldset>
            </form>
                <div
                    className="text-white bg-white w-full rounded-md p-8 text-slate-900 shadow-lg max-w-sm mx-auto text-sm leading-6 sm:text-base sm:leading-7 dark:bg-slate-800 dark:text-slate-400">
                {formData && (
                    <div>
                        <h2>Form Data</h2>
                        <p>Base Size: {Number(formData.baseSize)}</p>
                        <p>Type Scale: {formData.typeScale}</p>

                        <div
                            dangerouslySetInnerHTML={sanitizedData()}
                        />
                    </div>
                )}
                </div>

            </div>
        </div>
    );
}
