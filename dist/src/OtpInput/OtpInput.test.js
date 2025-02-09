"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("@testing-library/react-native");
const React = require("react");
const OtpInput_1 = require("./OtpInput");
const renderOtpInput = (props) => (0, react_native_1.render)(<OtpInput_1.OtpInput numberOfDigits={6} {...props}/>);
describe("OtpInput", () => {
    describe("UI", () => {
        test("should render correctly", () => {
            const tree = renderOtpInput().toJSON();
            expect(tree).toMatchSnapshot();
        });
        test("should render stick if hideStick is false", () => {
            renderOtpInput({ hideStick: false });
            const stick = react_native_1.screen.getByTestId("otp-input-stick");
            expect(stick).toBeTruthy();
        });
        // Test if the number of rendered inputs is equal to the number of digits
        test.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])("should render the correct number of inputs: %i", (numberOfDigits) => {
            renderOtpInput({ numberOfDigits: numberOfDigits });
            const inputs = react_native_1.screen.getAllByTestId("otp-input");
            expect(inputs).toHaveLength(numberOfDigits);
        });
    });
    describe("Logic", () => {
        test("should split text on screen from the text written in the hidden input", () => {
            const otp = "123456";
            renderOtpInput();
            const input = react_native_1.screen.getByTestId("otp-input-hidden");
            react_native_1.fireEvent.changeText(input, otp);
            (0, react_native_1.act)(() => {
                expect(react_native_1.screen.getByText("1")).toBeTruthy();
                expect(react_native_1.screen.getByText("2")).toBeTruthy();
                expect(react_native_1.screen.getByText("3")).toBeTruthy();
                expect(react_native_1.screen.getByText("4")).toBeTruthy();
                expect(react_native_1.screen.getByText("5")).toBeTruthy();
                expect(react_native_1.screen.getByText("6")).toBeTruthy();
                expect(react_native_1.screen.queryByText(otp)).not.toBeTruthy();
            });
        });
        test("ref clear() should clear input", () => {
            const ref = React.createRef();
            (0, react_native_1.render)(<OtpInput_1.OtpInput ref={ref} numberOfDigits={6}/>);
            const otp = "1";
            const input = react_native_1.screen.getByTestId("otp-input-hidden");
            react_native_1.fireEvent.changeText(input, otp);
            (0, react_native_1.act)(() => {
                ref.current?.clear();
            });
            expect(react_native_1.screen.queryByText("1")).toBeFalsy();
        });
        test("ref setValue() should set input value", () => {
            const ref = React.createRef();
            (0, react_native_1.render)(<OtpInput_1.OtpInput ref={ref} numberOfDigits={6}/>);
            const otp = "1";
            (0, react_native_1.act)(() => {
                ref.current?.setValue(otp);
            });
            expect(react_native_1.screen.getByText("1")).toBeTruthy();
        });
    });
});
