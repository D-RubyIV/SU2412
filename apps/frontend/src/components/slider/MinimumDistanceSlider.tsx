import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: any) {
    return `${value.toLocaleString('vi-VN')}d`;
}
const minDistance = 1000;

interface MinimumDistanceSliderProps {
    min: number;
    max: number;
    currentValue : number[];
    setMinMax: React.Dispatch<React.SetStateAction<number[]>>;
    onDragComplete?: (value: number[]) => void; // Optional prop for the function to be executed on drag complete
}
export default function MinimumDistanceSlider({ currentValue, min, max, setMinMax, onDragComplete }: MinimumDistanceSliderProps) {

    const [value2, setValue2] = React.useState<number[]>([min, max]);

    const handleChange2 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            console.log(activeThumb)
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], max - minDistance);
                setValue2([clamped, clamped + minDistance]);
                setMinMax(value2);
            } else {
                const clamped = Math.max(newValue[1], max);
                setMinMax(value2);
                setValue2([clamped - minDistance, max]);
            }
        } else {
            setValue2(newValue as number[]);
            setMinMax(value2);
        }
    };

    const handleDragComplete = (
        event: React.SyntheticEvent | Event,
        newValue: number | number[],
    ) => {
        if (Array.isArray(newValue) && onDragComplete) {
            onDragComplete(newValue);
        }
        console.log("OK")
        setMinMax(value2);


    };

    return (
        <div className='flex gap-5 items-center w-full justify-between'>
            <span className='text-sm w-20'>{valuetext(currentValue[0])}</span>
            <div>
                <Box sx={{ width: "200px" }}>
                    <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={currentValue}
                        onChange={handleChange2}
                        onChangeCommitted={handleDragComplete}
                        getAriaValueText={valuetext}
                        disableSwap
                        min={min}
                        max={max}
                    />
                </Box>
            </div>
            <span className='text-sm'>{valuetext(currentValue[1])}</span>
        </div>
    );
}