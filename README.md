# ShepherdMe.ai

This repository contains code to instantiate and deploy a toxic comment classifier along with a custom UI wrapper. This model is able to detect 6 types of toxicity in a text fragment. The six detectable types are - toxic, severe toxic, obscene, threat, insult, and identity hate. The hosted model can be found here - https://heroku-deployment-shepherme.herokuapp.com/

The model [MAX Toxic Comment Classifier](https://github.com/IBM/MAX-Toxic-Comment-Classifier/) is based on the [pre-trained BERT-Base, English Uncased](https://github.com/google-research/bert/blob/master/README.md) model and was finetuned on the [Toxic Comment Classification Dataset](https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge/data) using the [Huggingface BERT Pytorch repository](https://github.com/huggingface/pytorch-pretrained-BERT).

A brief definition of the six different toxicity types can be found below.

```
Toxic: very bad, unpleasant, or harmful

Severe toxic: extremely bad and offensive

Obscene: (of the portrayal or description of sexual matters) offensive or disgusting by accepted standards of morality and decency

Threat: a statement of an intention to inflict pain, injury, damage, or other hostile action on someone in retribution for something done or not done

Insult: speak to or treat with disrespect or scornful abuse

Identity hate: hatred, hostility, or violence towards members of a race, ethnicity, nation, religion, gender, gender identity, sexual orientation or any other designated sector of society
```

## Licenses
| Component | License | Link  |
| ------------- | --------  | -------- |
| This repository | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | [LICENSE](https://github.com/IBM/MAX-Toxic-Comment-Classifier/blob/master/LICENSE) |
| Finetuned Model Weights | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | [LICENSE](https://github.com/IBM/MAX-Toxic-Comment-Classifier/blob/master/LICENSE) |
| Pre-trained Model Weights | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | [LICENSE](https://github.com/google-research/bert/blob/master/LICENSE) |
| TensorFlow Model Code (3rd party) | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | [LICENSE](https://github.com/google-research/bert/blob/master/LICENSE) |
| PyTorch Model Code (3rd party) | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | [LICENSE](https://github.com/huggingface/pytorch-pretrained-BERT/blob/master/LICENSE) |
| Toxic Comment Classification Dataset | [CC0](https://creativecommons.org/share-your-work/public-domain/cc0/) | [LICENSE](https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge/data) |

## Pre-requisites:
* The minimum recommended resources for this model is 4GB Memory.
* `IBM Cloud account and CLI`: An [IBM Cloud account](http://ibm.biz/max-contents) and command-line interface is needed for this to run. Follow the [installation instructions](https://cloud.ibm.com/docs/cli?topic=cli-getting-started) to install the IBM Cloud?? Command Line Interface, along with the option to install popular plug-ins and tools so that you can work with apps, toolchains, pipelines, Kubernetes clusters, and more in IBM Cloud.
* `heroku`: A [heroku](https://www.heroku.com/) account is needed for deploying the Angular app ShepherdMe.ai

## Installation Guide

### Installing IBM CLI and other plugins

1. Once you've created an [IBM Cloud account](http://ibm.biz/max-contents), you can follow the belowmentioned commands to install the latest CLI dependencies on Windows through Powershell

```shell
iex(New-Object Net.WebClient).DownloadString('https://clis.cloud.ibm.com/install/powershell')
```

For Mac, use the following:
```shell
curl -fsSL https://clis.cloud.ibm.com/install/osx | sh
```

2. The IBM Cloud Object Storage plug-in extends the IBM Cloud command line interface (CLI) with an API wrapper for working with Object Storage, Container Registry, Cloud Functions and Conatiner Services plugins.

```shell
ibmcloud plugin install cloud-object-storage
ibmcloud plugin install container-registry
ibmcloud plugin install cloud-functions
ibmcloud plugin install container-service
```
### Creating K8S Cluster

Create a Kubernetes cluster called **mycluster-free** on your IBM Cloud account. The free cluster type will suffice. Create a Kubernetes cluster from the [IBM Catalog](https://cloud.ibm.com/kubernetes/catalog/about). Setup the kubernetes cluster in the US South using:

```shell
ibmcloud login -a https://cloud.ibm.com
ibmcloud ks region-set us-south
ibmcloud ks cluster config --cluster mycluster-free
```
### Cloning and downloading the project

1. Clone/Fork the [ShepherdMe.ai project](https://github.com/AllaPranathi/Shepherdme.ai.git) by clicking on the Fork button shown below

![Fork Button](https://github.com/AllaPranathi/Shepherdme.ai/blob/main/screenshots/fork.PNG "Fork Button")

 2. Download [ShepherdMe.ai project](https://github.com/AllaPranathi/Shepherdme.ai.git). If using command line remember to use git clone followed by the link!
  - Unzip the folder and open the location in Powershell
  - Run ```shell npm i``` to install the necessary libraries and dependencies
  - Run ```shell npm run ng serve``` to compile and locally run the app. By default the angular app runs on https:

The app is now ready to be deployed on Heroku. Yay!

**NOTE - If you see a warning similar to - Your global Angular CLI version (12.2.12) is greater than your local version (10.0.8), there's nothing to worry about.**

### Setting up Heroku

Login to your dashboard and create a new app. Yep, that's the only thing to be done here.

## Deployment Guide

We have created our User Interface on Angular and have utilised the Heroku platform to host the UI application. Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud. 

### Deploying the IBM MAX Model

1.  Clone the [MAX-Toxic-Comment-Classifier repository](https://github.com/IBM/MAX-Toxic-Comment-Classifier/) from GitHub
2.  Apply the configuration file to your Kubernetes cluster
```shell
cd MAX-Toxic-Comment-Classifier
kubectl apply -f .\max-toxic-comment-classifier.yaml
```
3. After the model is deployed (give it some time), find the public IP address and port that the API is served on. NOTE - mycluster-free is the name we set earlier.
  - For public IP
```shell
ibmcloud ks workers -c mycluster-free
```
  - For port
```shell
kubectl describe service max-toxic-comment-classifier | grep Port
```
NOTE - Remember to delete the K8S instance you created earlier after you're done. ShepherdMe.ai is not responsible for any charges you might face. Brain maybe but? ;)

### Deploying the Angular App on Heroku

1. In the Deploy menu, under Deployment method, select GitHub and connect to the github repo you just forked/cloned. For us it was the main branch. This will help us to make automatic deployments every time we push to our main branch.
2. Run ```shell npm i express --save locally``` to access the express server that helps us serve our hosted application.
3. Go to Heroku Dashboard > Select your app > Deploy > Deploy Branch
4. Your app will be up and running on the Heroku platform. 

### Deploying the Angular App locally

1. Download the code from Github - https://github.com/AllaPranathi/Shepherdme.ai/tree/FileUpload_backup 
2. Unzip the folder and open the location in terminal
3. Run npm i to install the necessary libraries and dependencies
4. Run npm run ng serve to compile and locally run the app. By default the angular app runs on https:localhost:4200/ 

And that's it Folks!

### Main User Interface
![Main User Interface](https://github.com/AllaPranathi/Shepherdme.ai/blob/main/screenshots/main-ui.PNG "Main User Interface")
### File Upload Functionality
![File Upload Functionality](https://github.com/AllaPranathi/Shepherdme.ai/blob/main/screenshots/file-upload.PNG "File Upload Functionality")
### Abusive Content Reported
![Abusive Content Reported](https://github.com/AllaPranathi/Shepherdme.ai/blob/main/screenshots/abusive-content.PNG "Abusive Content Reported")
### Non-Abusive Content Reported
![Non-Abusive Content Reported](https://github.com/AllaPranathi/Shepherdme.ai/blob/main/screenshots/file-upload.PNG "Non-Abusive Content Reported")
### Non-Abusive Content Reported
![Non-Abusive Content Reported](https://github.com/AllaPranathi/Shepherdme.ai/blob/main/screenshots/file-upload.PNG "Non-Abusive Content Reported")

## Project Limitations

Since it was just a Semester long effort, the project has it's limitations. 

1. Only text file upload is supported as part of the MVP. As part of future enhancements, .docx, .pptx, .rtf files will be supported in the next set of releases.
2. Further enhancements are required to semantic analysis capabilities of the model supporting the application. As part of the next feature rollout, increase in accuracy would be required to better predict toxicity and abuse. (See the screenshot below)
3. The current User Interface only supports and tested on Desktop resolutions of 1440px and 1040 px.

![Project Limitations](https://github.com/AllaPranathi/Shepherdme.ai/blob/main/screenshots/limitations.PNG "Project Limitations")

**Note - If you want to upload a file after using the application once, you can only do so after clearing the existing result, i.e. If you checked for something once (Text/File), until you reset it using the Clear button, the drag/click to select file will be disabled.**
