import React from "react";
import "./styles.css";

type ChangeColorMenuProps = {
    clickedBallId: number;
    handleCloseMenu: () => void;
    changeBallColorById: (id: number, color: string) => void;
};

const colorsData = [
    { id: 0, value: "blue" },
    { id: 1, value: "green" },
    { id: 2, value: "orange" },
    { id: 3, value: "red" },
    { id: 4, value: "yellow" },
    { id: 5, value: "purple" },
    { id: 6, value: "cyan" },
    { id: 7, value: "magenta" },
    { id: 8, value: "lime" },
    { id: 9, value: "pink" },
    { id: 10, value: "teal" },
    { id: 11, value: "lavender" },
    { id: 12, value: "brown" },
];
export const ChangeColorMenu: React.FC<ChangeColorMenuProps> = ({
    clickedBallId,
    handleCloseMenu,
    changeBallColorById,
}) => {

    const changeColor = (ballId: number, newColor: string) => {
        changeBallColorById(ballId, newColor);
        handleCloseMenu()
    }
    return (
        <div className="menu-container">
            <div className="menu-content">
                {colorsData.map(({ id, value }) => (
                    <div
                        className="color-point"
                        key={id}
                        style={{ backgroundColor: `${value}` }}
                        onClick={() => changeColor(clickedBallId, value)}
                    />
                ))}
            </div>
        </div>
    );
};
