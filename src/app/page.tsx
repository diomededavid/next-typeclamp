'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import DOMPurify from 'dompurify';

enum TypeScaleEnums {
  MajorSecond = 1.125,
  MajorThird = 1.25,
  PerfectFourth = 1.333,
  GoldenRatio = 1.618,
}

interface FormValues {
  baseSize: string;
  exampleRequired: string;
  typeScale: TypeScaleEnums;
  sampleText: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormValues | null>(null);

  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      baseSize: '16',
      typeScale: TypeScaleEnums.MajorSecond,
      sampleText: 'Type Clamp',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setFormData(data);
  };

  const calculateNextSize = (baseSize: number, scale: number) => {
    return baseSize * scale;
  };

  const arr = new Array(5);
  arr.fill(0);

  const sampleText = String(formData?.sampleText);
  const nextSize = formData
    ? calculateNextSize(Number(formData.baseSize), formData.typeScale)
    : 0;

  const baseSize = 16; // Base size in px
  const scale = 1.125; // Example scale factor
  const steps = 5; // Number of steps to calculate
  const sizes = [`${baseSize}rem`];
  function clamp() {
    for (let i = 1; i < steps; i++) {
      const nextSize = parseFloat(sizes[i - 1]) * scale;
      return sizes.push(`${nextSize}rem`);
    }
  }

  // const fontSizes = sizes.map((size) => parseFloat(size));
  // console.log(sizes);
  const headings = arr.map(
    (_, index) =>
      `<h${index + 1} style="font-size: ${clamp() + 'rem'}">${sampleText}</h${index + 1}>`
  );
  const result = headings.join('\n');
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(result),
  });

  return (
    <div>
      <h1 className="page--header ">TypeClamp</h1>
      <div className="grid grid-cols-2 gap-4 my-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Common values</legend>
            <label>Base size (px)</label>
            <input {...register('baseSize')} defaultValue={'16'} />
            <label>Scale</label>
            <div className="custom-select">
              <select {...register('typeScale')}>
                {Object.entries(TypeScaleEnums)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => (
                    <option key={key} value={value}>
                      {key} {value}
                    </option>
                  ))}
              </select>
            </div>
            <label>Sample Text</label>
            <input {...register('sampleText')} defaultValue={sampleText} />
            <legend>Typography</legend>
            <input type="submit" />
          </fieldset>
        </form>
        <div className="text-white bg-white w-full rounded-md p-8 text-slate-900 shadow-lg max-w-sm mx-auto text-sm leading-6 sm:text-base sm:leading-7 dark:bg-slate-800 dark:text-slate-400">
          {formData ? (
            <div>
              <h2>Form Data</h2>
              <p>Base Size: {Number(formData.baseSize)}</p>
              <p>Type Scale: {formData.typeScale}</p>
              <p>Next Size: {nextSize}</p>
              <div dangerouslySetInnerHTML={sanitizedData()} />
            </div>
          ) : (
            <div>Hello </div>
          )}
        </div>
      </div>
    </div>
  );
}
