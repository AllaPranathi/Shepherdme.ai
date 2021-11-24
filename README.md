# ShepherdMe.ai

This repository contains code to instantiate and deploy a toxic comment classifier along with a custom UI wrapper. This model is able to detect 6 types of toxicity in a text fragment. The six detectable types are toxic, severe toxic, obscene, threat, insult, and identity hate.

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
* `IBM Cloud account and CLI`: The [IBM Cloud account](http://ibm.biz/max-contents) and command-line interface is needed for this to run. Follow the [installation instructions](https://cloud.ibm.com/docs/cli?topic=cli-getting-started) to install the IBM Cloud® Command Line Interface, along with the option to install popular plug-ins and tools so that you can work with apps, toolchains, pipelines, Kubernetes clusters, and more in IBM Cloud..
* `heroku`: 

## Installation Guide

1. Once you've created an [IBM Cloud account](http://ibm.biz/max-contents), you can follow the belowmentioned commands to install the latest CLI dependencies on Windows through Powershell

```shell
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
choco install curl -y
choco install grep -y
```
2. The IBM Cloud Object Storage plug-in extends the IBM Cloud command line interface (CLI) with an API wrapper for working with Object Storage, Container Registry, Cloud Functions and Conatiner Services plugins.

```shell
ibmcloud plugin install cloud-object-storage
ibmcloud plugin install container-registry
ibmcloud plugin install cloud-functions
ibmcloud plugin install container-service
```

3. Download [ShpherdMe.ai project](https://github.com/AllaPranathi/Shepherdme.ai.git) and setup the kubernetes cluster

```shell
cd ..\..\Users\bangabot\shepherdme-ai\
ibmcloud login
ibmcloud ks cluster config --cluster mycluster-free
kubectl apply -f .\shepherdme-ai.yaml
ibmcloud ks workers -c mycluster-free
kubectl get services
kubectl describe service shepherdme-ai | grep Port
//To get public IP
ibmcloud ks workers -c mycluster-free
```

## Deployment Guide
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
![Project Limitations](https://github.com/AllaPranathi/Shepherdme.ai/blob/main/screenshots/limitations.PNG "Project Limitations")
