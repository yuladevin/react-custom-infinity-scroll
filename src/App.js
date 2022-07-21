import React from "react"
import {ScrollDomUpdate} from "./components/ScrollDomUpdate/scrollDomUpdate";
import MY_ENDLESS_LIST from "./mock/Constants";

function App() {
	return (
		<div className="App">
			<ScrollDomUpdate list={MY_ENDLESS_LIST} height={195}/>
		</div>
	)
}
export default App
