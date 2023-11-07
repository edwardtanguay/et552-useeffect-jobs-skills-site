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
			<h1 className="text-3xl mb-3 text-slate-800">Jobs/Skills Site</h1>
			<h2 className="text-xl mb-3">There are {jobs.length} jobs.</h2>
			<div>
				{jobs.map(job => {
					return (
						<p className="bg-slate-300 p-2 mb-2 w-[20rem] rounded">{job.title}</p>
					)
				})}
			</div>
		</>
	);
}

export default App;
