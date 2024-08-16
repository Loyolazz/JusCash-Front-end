export const Opportunities = (checkeds: any) => {
    return CHECKBOXES.map((checkbox) => {
        if (checkeds.includes(checkbox.id)) {
            return { ...checkbox, checked: true };
        } else {
            return checkbox;
        }
    });
};

export const CHECKBOXES = [
    {
        id: "1",
        label: "Honorários Sucumbenciais",
        checked: false,
    },
    {
        id: "2",
        label: "Honorários Contratuais",
        checked: false,
    },
    {
        id: "3",
        label: "Honorários Dativos",
        checked: false,
    },
    {
        id: "4",
        label: "Crédito do Autor",
        checked: false,
    },
];
