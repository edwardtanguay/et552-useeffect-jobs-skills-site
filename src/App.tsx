import { useEffect, useState } from "react";
import * as config from "./config";
import { IJob } from "./interfaces";
import { ISkill } from "./interfaces";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

function App() {
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [skills, setSkills] = useState<ISkill[]>([]);

	useEffect(() => {
		(async () => {
			const _jobs = (await axios.get(config.jobsUrl)).data;
			setJobs(_jobs);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const _skills = (await axios.get(config.skillsUrl)).data;
			setSkills(_skills);
		})();
	}, []);

	return (
		<>
			<h1 className="text-3xl mb-3 bg-slate-600 text-slate-200 p-4">
				Jobs/Skills Site
			</h1>
			<main className="flex justify-around min-w-fit">
				<section className="mx-6">
					{jobs.length === 0 ? (
						<h2 className="text-xl mb-3 w-[20rem] flex justify-center">
							<FaSpinner className="spinner mt-6 text-slate-300" />
						</h2>
					) : (
						<>
							<h2 className="text-xl mb-3">
								There are {jobs.length} jobs.
							</h2>
							{jobs.map((job) => {
								return (
									<p className="bg-slate-300 p-2 mb-2 w-[20rem] rounded">
										{job.title}
									</p>
								);
							})}
						</>
					)}
				</section>
				<section className="mx-6">
					{skills.length === 0 ? (
						<h2 className="text-xl mb-3 w-[20rem] flex justify-center">
							<FaSpinner className="spinner mt-6 text-gray-300" />
						</h2>
					) : (
						<>
							<h2 className="text-xl mb-3">
								There are {skills.length} skills.
							</h2>
							{skills.map((skill) => {
								return (
									<p className="bg-gray-300 p-2 mb-2 w-[20rem] rounded">
										{skill.name}
									</p>
								);
							})}
						</>
					)}
				</section>
			</main>
		</>
	);
}

export default App;
