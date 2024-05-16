"use client";

import {
    CountryData,
    guessCountryByPartialPhoneNumber,
    usePhoneInput,
} from "react-international-phone";
import { Input } from "../ui/input";

const countries: CountryData[] = [["Russia", "ru", "7", "(...) ...-..-..", 1]];

export function validatePhoneInput(value: string): boolean {
    const country = guessCountryByPartialPhoneNumber({
        phone: value,
        countries,
    }).country;

    if (!country || typeof country.format !== "string") {
        return false;
    }

    const dialCodeLength = country.dialCode.length + 2;
    const formattingMaskLength = country.format.length;
    const fullLength = dialCodeLength + formattingMaskLength;

    return value.length === fullLength;
}

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export function PhoneInput(props: Props) {
    const { inputValue, handlePhoneValueChange } = usePhoneInput({
        defaultCountry: "ru",
        countries: countries,
        value: props.value.replace(/\D/g, ""),
        onChange: (data) => {
            props.onChange(data.inputValue);
        },
    });

    return <Input value={inputValue} onChange={handlePhoneValueChange} />;
}
