export const TOGGLE_TAB = "TOGGLE_TAB";

export const toggleTab = tabName =>
    () => ({
        type: TOGGLE_TAB,
        tabName,
    });
