import { useEffect, useState } from "react";
import * as config from "./config";
import { IJob } from "./interfaces";
import axios from "axios";

function App() {
	const [jobs, setJobs] = useState<IJob[]>([]);

	useEffect(() => {
		(async () => {
			const _jobs = (await axios.get(config.jobsUrl)).data;
			setJobs(_jobs);
		})();
	}, []);

	return (
		<>
			<h1 className="text-3xl mb-3 text-slate-800">Info Site</h1>
			<p>There are {jobs.length} jobs.</p>
		</>
	);
}

export default App;
