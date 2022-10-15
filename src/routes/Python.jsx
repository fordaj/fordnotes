import VersionBar from '../components/VersionBar';
import Heading from '../components/Heading'
import Reference from "../components/Reference"
const Python = () => {
  return (
    <div>
      <h1>Python</h1>
      <div class="versions">
          <button class="version in-progress">Mac OS</button>
          <button class="version in-progress">MacOS Monterey</button>
          <button class="version in-progress">Python 3</button>
      </div>
      <section class="entry" id="pip">
          <h2>pip</h2>
          <div>
              <h3>pip freeze</h3>
              <p>It is recommended to hand-craft your requirements file. This keeps things concise, and should a project migrate away from dependency packages, they will not be carried along unnecessarily. Put simply, follow these steps to safely export and import a set of python pip packages.</p>
              <ol>
                  <li>pip freeze</li>
                  <pre><button onclick="copy(nextSibling)">Copy</button><code class="language-bash">pip freeze > requirements_freeze.txt</code><p class="language">bash</p></pre>
                  <li>Open <code>requirements_freeze.txt</code>, and extract the packages that are important to the project, ignoring dependencies, into a file called <code>requirements.txt</code>.</li>
                  <li>Install packages by importing a <code>requirements.txt</code> file</li>
                  <pre><button onclick="copy(nextSibling)">Copy</button><code class="language-bash">pip install -r requirements.txt</code><p class="language">bash</p></pre>
              </ol>
          </div>
      </section>
        <h2>Virtual Environments</h2>
        <div class="macos macos-monterey python3">
        <p>https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/</p>
            <Heading H3={"Installation"} Versions={["Windows", "MacOS", "Linux"]} 
              Background={"How to install venv"}/>
            <Reference Author={"Andrew Ford"} Name={"fordnotes"} URL={"www.fordnotes.com"}/>
            {/* <DynamicInput Key={"venv_name"} Placeholder={"MyVirtualEnvironment"}/> */}
            {/* <Code language={"bash"} 
              command={[
                ["brew install virtualenv", <DynamicOutput Key={"venv_name"} Placeholder={"MyVirtualEnvironment"}/>],
                ["brew install virtualenv", <DynamicOutput Key={"venv_name"} Placeholder={"MyVirtualEnvironment"}/>]
              ]}/> */}
            <h3>Create an Environment</h3>
            Virtual Environment Name: <input type="text" placeholder="myVirtualEnvironment" class="venv_name" onchange="renderInput('venv_name')"></input>
            <pre><button onclick="copy(nextSibling)">Copy</button><code class="nohighlight">virtualenv --system-site-packages -p python3 ./<span class="venv_name">myVirtualEnvironment</span></code><p class="language">bash</p></pre>
            <h3>Create Virtual Environment Directory</h3>
            <pre><button onclick="copy(nextSibling)">Copy</button><code class="nohighlight">virtualenv --system-site-packages -p python3 ./<span class="venv_name">myVirtualEnvironment</span></code><p class="language">bash</p></pre>
            <h3>Activate Virtual Environment</h3>
            <pre><button onclick="copy(nextSibling)">Copy</button><code class="nohighlight">cd ./<span class="venv_name">myVirtualEnvironment</span> && source bin/activate</code><p class="language">bash</p></pre>
        </div>
    </div>
  );
};

export default Python;
