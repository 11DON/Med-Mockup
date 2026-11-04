export const fieldHandler = (value,onchange) => (e) => {
    const{name,type,value:v,checked} = e.target;
    onchange ({...value,[name]:type === "checkbox"?checked:v});
}

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

export function validateSchedule(value) {
    for (const slot of value) {
        if (!TIME.test(slot.from) || !TIME.test(slot.to)) return `${slot.day}: enter a valid time (HH:mm).`;
        if (slot.to <= slot.from) return `${slot.day}: "To" must be after "From".`;
    }
    return "";
}