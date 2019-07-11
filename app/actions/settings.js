export const TOGGLE_SAVE_WORLD_FILE = "TOGGLE_SAVE_WORLD_FILE";
export const CHANGE_DATE = "CHANGE_DATE";

export const toggleSaveWorldFile = () => ({type: TOGGLE_SAVE_WORLD_FILE});

export const changeDate = (date) => ({
    type: CHANGE_DATE,
    date
});
