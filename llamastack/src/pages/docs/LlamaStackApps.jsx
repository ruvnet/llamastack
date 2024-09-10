import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LlamaStackApps = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Llama Stack Apps</h1>
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Detailed technical documentation on installing and using the code in this repository.</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold mt-4">Installation</h2>
          
          <h3 className="text-xl font-semibold mt-4">Prerequisites</h3>
          <ol className="list-decimal pl-5 mt-2">
            <li>
              <strong>Python Packages</strong>
              <p>We recommend creating an isolated conda Python environment:</p>
              <pre className="bg-gray-100 p-2 rounded mt-2">
{`# Create and activate a virtual environment
ENV=app_env
conda create -n $ENV python=3.10
cd <path-to-llama-stack-apps-repo>
conda activate $ENV

# Install dependencies
pip install -r requirements.txt`}
              </pre>
            </li>
            <li>
              <strong>bubblewrap</strong>
              <p>The code execution environment uses <a href="https://github.com/containers/bubblewrap" className="text-blue-600 hover:underline">bubblewrap</a> for isolation. This may already be installed on your system; if not, it's likely in your OS's package repository.</p>
            </li>
            <li>
              <strong>Ollama (optional)</strong>
              <p>If you plan to use Ollama for inference, you'll need to install the server <a href="https://ollama.com/download" className="text-blue-600 hover:underline">via these instructions</a>.</p>
            </li>
          </ol>

          <h3 className="text-xl font-semibold mt-4">Download Checkpoints</h3>
          <h4 className="text-lg font-semibold mt-2">Downloading from Meta</h4>
          <p>Download the required checkpoints using the following commands:</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">
{`# download the 8B model, this can be run on a single GPU
llama download --source meta --model-id Meta-Llama3.1-8B-Instruct --meta-url META_URL

# you can also get the 70B model, this will require 8 GPUs however
llama download --source meta --model-id Meta-Llama3.1-70B-Instruct --meta-url META_URL

# llama-agents have safety enabled by default. For this, you will need
# safety models -- Llama-Guard and Prompt-Guard
llama download --source meta --model-id Prompt-Guard-86M --meta-url META_URL
llama download --source meta --model-id Llama-Guard-3-8B --meta-url META_URL`}
          </pre>
          <p>For all the above, you will need to provide a URL (META_URL) which can be obtained from <a href="https://llama.meta.com/llama-downloads/" className="text-blue-600 hover:underline">https://llama.meta.com/llama-downloads/</a> after signing an agreement.</p>

          <h4 className="text-lg font-semibold mt-4">Downloading from Huggingface</h4>
          <p>Essentially, the same commands above work, just replace `--source meta` with `--source huggingface`.</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">
{`llama download --source huggingface --model-id  Meta-Llama3.1-8B-Instruct --hf-token <HF_TOKEN>

llama download --source huggingface --model-id Meta-Llama3.1-70B-Instruct --hf-token <HF_TOKEN>

llama download --source huggingface --model-id Llama-Guard-3-8B --ignore-patterns *original*
llama download --source huggingface --model-id Prompt-Guard-86M --ignore-patterns *original*`}
          </pre>
          <p><strong>Important:</strong> Set your environment variable `HF_TOKEN` or pass in `--hf-token` to the command to validate your access. You can find your token at <a href="https://huggingface.co/settings/tokens" className="text-blue-600 hover:underline">https://huggingface.co/settings/tokens</a>.</p>

          <h4 className="text-lg font-semibold mt-4">Downloading via Ollama</h4>
          <p>If you're already using ollama, we also have a supported Llama Stack distribution `local-ollama` and you can continue to use ollama for managing model downloads.</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">
{`ollama pull llama3.1:8b-instruct-fp16
ollama pull llama3.1:70b-instruct-fp16`}
          </pre>
          <p><strong>Note:</strong> Only the above two models are currently supported by Ollama.</p>

          <h3 className="text-xl font-semibold mt-4">Installing and Configuring Distributions</h3>
          <p><strong>Note:</strong> `local` distribution has only been tested on linux as of now. For other platforms (ubuntu, mac) try using the `local-ollama` distribution and install platform specific ollama.</p>
          <p>Let's start with listing available distributions:</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">
{`$ llama stack list-distributions

+--------------------------------+---------------------------------------+----------------------------------------------------------------------+
| Distribution ID                | Providers                             | Description                                                          |
+--------------------------------+---------------------------------------+----------------------------------------------------------------------+
| local                          | {                                     | Use code from \`llama_toolchain\` itself to serve all llama stack APIs |
|                                |   "inference": "meta-reference",      |                                                                      |
|                                |   "memory": "meta-reference-faiss",   |                                                                      |
|                                |   "safety": "meta-reference",         |                                                                      |
|                                |   "agentic_system": "meta-reference"  |                                                                      |
|                                | }                                     |                                                                      |
+--------------------------------+---------------------------------------+----------------------------------------------------------------------+
| remote                         | {                                     | Point to remote services for all llama stack APIs                    |
|                                |   "inference": "remote",              |                                                                      |
|                                |   "safety": "remote",                 |                                                                      |
|                                |   "agentic_system": "remote",         |                                                                      |
|                                |   "memory": "remote"                  |                                                                      |
|                                | }                                     |                                                                      |
+--------------------------------+---------------------------------------+----------------------------------------------------------------------+
| local-ollama                   | {                                     | Like local, but use ollama for running LLM inference                 |
|                                |   "inference": "remote::ollama",      |                                                                      |
|                                |   "safety": "meta-reference",         |                                                                      |
|                                |   "agentic_system": "meta-reference", |                                                                      |
|                                |   "memory": "meta-reference-faiss"    |                                                                      |
|                                | }                                     |                                                                      |
+--------------------------------+---------------------------------------+----------------------------------------------------------------------+
| local-plus-fireworks-inference | {                                     | Use Fireworks.ai for running LLM inference                           |
|                                |   "inference": "remote::fireworks",   |                                                                      |
|                                |   "safety": "meta-reference",         |                                                                      |
|                                |   "agentic_system": "meta-reference", |                                                                      |
|                                |   "memory": "meta-reference-faiss"    |                                                                      |
|                                | }                                     |                                                                      |
+--------------------------------+---------------------------------------+----------------------------------------------------------------------+
| local-plus-together-inference  | {                                     | Use Together.ai for running LLM inference                            |
|                                |   "inference": "remote::together",    |                                                                      |
|                                |   "safety": "meta-reference",         |                                                                      |
|                                |   "agentic_system": "meta-reference", |                                                                      |
|                                |   "memory": "meta-reference-faiss"    |                                                                      |
|                                | }                                     |                                                                      |
+--------------------------------+---------------------------------------+----------------------------------------------------------------------+`}
          </pre>

          <p>To install a distribution, we run a simple command providing 2 inputs:</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Distribution Id</strong> of the distribution that we want to install ( as obtained from the list-distributions command )</li>
            <li>A <strong>Name</strong> for the specific build and configuration of this distribution.</li>
          </ul>

          <p>Let's imagine you are working with a 8B-Instruct model. The following command will build a package (in the form of a Conda environment) <em>and</em> configure it. As part of the configuration, you will be asked for some inputs (model_id, max_seq_len, etc.) We will name our build `8b-instruct` to help remember the config.</p>

          <pre className="bg-gray-100 p-2 rounded mt-2">
{`llama stack build local --name 8b-instruct`}
          </pre>

          <p>You can re-configure this distribution by running:</p>

          <pre className="bg-gray-100 p-2 rounded mt-2">
{`llama stack configure local --name 8b-instruct`}
          </pre>

          <h3 className="text-xl font-semibold mt-4">Installing and Configuring `local-ollama` Distribution</h3>
          <p>On one terminal, start ollama server using:</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">
{`ollama serve`}
          </pre>

          <p>You can test your ollama setup via:</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">
{`ollama run llama3.1:8b-instruct-fp16`}
          </pre>

          <p>Now, install the llama stack distribution:</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">
{`llama stack build local-ollama --name 8b-instruct`}
          </pre>

          <h3 className="text-xl font-semibold mt-4">Starting up the Stack</h3>
          <p>Now let's start Llama Stack server. You need the YAML configuration file which was written out at the end by the `llama stack build` step.</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">
{`llama stack run local-ollama --name 8b-instruct --port 5000`}
          </pre>

          <h3 className="text-xl font-semibold mt-4">Add API Keys for Tools</h3>
          <p>API key configuration for the Agentic System will be asked by the `llama stack build` script when you install a Llama Stack distribution.</p>
          <p>Tools that the model supports and which need API Keys:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Brave for web search (<a href="https://api.search.brave.com/register" className="text-blue-600 hover:underline">https://api.search.brave.com/register</a>)</li>
            <li>Wolfram for math operations (<a href="https://developer.wolframalpha.com/" className="text-blue-600 hover:underline">https://developer.wolframalpha.com/</a>)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">Start an App and Interact with the Server</h3>
          <p>Start an app (local) and interact with it by running the following command:</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">
{`mesop app/main.py`}
          </pre>

          <h3 className="text-xl font-semibold mt-4">Create agentic systems and interact with the Stack server</h3>
          <p>NOTE: Ensure that Stack server is still running.</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">
{`cd <path-to-llama-agentic-system>
conda activate $ENV
llama stack run local-ollama --name 8b --port 5000 # If not already started

PYTHONPATH=. python examples/scripts/vacation.py localhost 5000`}
          </pre>

          <h3 className="text-xl font-semibold mt-4">Using VirtualEnv instead of Conda</h3>
          <p><strong>Note:</strong> While you can run the apps using `venv`, installation of a distribution requires conda.</p>

          <h4 className="text-lg font-semibold mt-2">In Linux</h4>
          <pre className="bg-gray-100 p-2 rounded mt-2">
{`# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate`}
          </pre>

          <h4 className="text-lg font-semibold mt-2">For Windows</h4>
          <pre className="bg-gray-100 p-2 rounded mt-2">
{`# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate  # For Command Prompt
# or
.\venv\Scripts\Activate.ps1  # For PowerShell
# or
source venv\Scripts\activate  # For Git Bash`}
          </pre>

          <p>The instructions thereafter (including `pip install -r requirements.txt` for installing the dependencies) remain the same.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LlamaStackApps;