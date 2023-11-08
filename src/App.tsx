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
			const _jobs: IJob[] = (await axios.get(config.jobsUrl)).data;
			for (const _job of _jobs) {
				_job.isOpen = false;
			}
			setJobs(_jobs);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const _skills: ISkill[] = (await axios.get(config.skillsUrl)).data;
			for (const _skill of _skills) {
				_skill.isOpen = false;
			}
			setSkills(_skills);
		})();
	}, []);

	const handleToggleJob = (job: IJob) => {
		job.isOpen = !job.isOpen;
		const _jobs = structuredClone(jobs);
		setJobs(_jobs);
	}

	const handleToggleSkill = (skill: ISkill) => {
		skill.isOpen = !skill.isOpen;
		const _skills = structuredClone(skills);
		setSkills(_skills);
	}

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
									<p key={job.id} onClick={() => handleToggleJob(job)} className="bg-slate-300 cursor-pointer p-2 mb-2 w-[20rem] rounded">
										<span style={{fontWeight: job.isOpen ? 'bold' : 'normal'}}>{job.title}</span>
										{job.isOpen && (
											<div className="text-orange-800 italic">
												<p>{job.company}</p>	
												<p>{job.publicationDate}</p>	
												</div>
										)}
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
									<p key={skill.id} onClick={() => handleToggleSkill(skill)} className="bg-gray-300 p-2 mb-2 w-[20rem] cursor-pointer rounded">
										<span style={{fontWeight: skill.isOpen ? 'bold' : 'normal'}}>{skill.name}</span>
										{skill.isOpen && (
											<div className="text-blue-800 italic">
												<p>{skill.description}</p>	
												</div>
										)}
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
