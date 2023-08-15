import { useState, useReducer } from "react";
import resultReducer from "../reducers/resultReducer";

export default function LearnReducer() {
	const [firstNumberInput, setFirstNumberInput] = useState(null);
	const [secondNumberInput, setSecondNumberInput] = useState(null);

	const [result, dispatch] = useReducer(resultReducer, null);

	// EVENT HANDLERS
	function handleSumClick() {
		dispatch({
			type: "added",
			payload: {
				firstNumber: firstNumberInput,
				secondNumber: secondNumberInput,
			},
		});
	}

	function handleSubClick() {
		dispatch({
			type: "subtracted",
			payload: {
				firstNumber: firstNumberInput,
				secondNumber: secondNumberInput,
			},
		});
	}

	function handleMultClick() {
		dispatch({
			type: "multiplied",
			payload: {
				firstNumber: firstNumberInput,
				secondNumber: secondNumberInput,
			},
		});
	}

	function handleDivClick() {
		dispatch({
			type: "divided",
			payload: {
				firstNumber: firstNumberInput,
				secondNumber: secondNumberInput,
			},
		});
	}

	return (
		<div className="App">
			<div
				style={{
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
					background: "teal",
				}}
			>
				{/* FIRST INPUT */}
				<label>First Number</label>
				<input
					value={firstNumberInput}
					onChange={(e) => setFirstNumberInput(e.target.value)}
				/>

				{/* SECOND INPUT */}
				<label>Second Number</label>
				<input
					value={secondNumberInput}
					onChange={(e) => setSecondNumberInput(e.target.value)}
				/>

				<button onClick={handleSumClick}>sum</button>

				<button onClick={handleSubClick}>subtract</button>

				<button onClick={handleMultClick}>multiply</button>

				<button onClick={handleDivClick}>divide</button>

				<hr />
                
				<h2>{result}</h2>
			</div>
		</div>
	);
}

