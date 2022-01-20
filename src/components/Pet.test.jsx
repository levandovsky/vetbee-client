import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter, useNavigate} from "react-router-dom";
import {Pet} from "./Pet";

jest.mock("react-router-dom", () => {
    const actualNav = jest.requireActual("react-router-dom");
    return {
        ...actualNav,
        useNavigate: jest.fn(),
    };
});

describe("Pet Component", () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
    });

    const pet = {
        id: "test",
        name: "test",
        dob: "test",
        client_email: "test",
    };

    it("renders without errors", () => {
        render(
            <BrowserRouter>
                <Pet pet={pet} />
            </BrowserRouter>
        );
    });

    it("calls navigate when showLogs button is pressed", async () => {
        render(
            <BrowserRouter>
                <Pet pet={pet} />
            </BrowserRouter>
        );

        const btn = await screen.findByText("Show logs");
        fireEvent.click(btn);
        expect(mockNavigate).toBeCalledTimes(1);
        expect(mockNavigate).toHaveBeenLastCalledWith("/health-records/test");
    });
});
