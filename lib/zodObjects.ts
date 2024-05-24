import { z } from "zod";
import { getToday } from "./dates";

export const requiredString = z
    .string({ required_error: "Обязательное поле" })
    .min(1, {
        message: "Обязательное поле",
    });

export const requiredPassword = z
    .string({ required_error: "Обязательное поле" })
    .min(4, {
        message: "Пароль должен содержать не меньше 4 символов",
    });

export const requiredNumber = z.coerce
    .number({ required_error: "Обязательное поле" })
    .min(0, {
        message: "Поле должно содержать число не меньше 0",
    });

export const requiredDate = z.date({ required_error: "Обязательное поле" });

export const requiredDateFromToday = requiredDate.min(getToday(), {
    message: "Дата не может быть ранее, чем сегодня",
});
