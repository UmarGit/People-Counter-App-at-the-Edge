
# Project Write-Up

## Explaining Custom Layers

  

**The process behind converting custom layers involves as follows:**

 - **Building The Model :** 
	 - First we need to export the custom layers from open vino.
	 - `export CLWS=/home/workspace/cl_tutorial1`
	 - `export CLT=$CLWS/OpenVINO-Custom-Layers`
	 - Then we create a directory and initialize our custom layer file which will include our model and layer.
 - **Creating The Custom Layer :**
	 - We will use the **Model Extension Generator** tool to automatically create templates for all the extensions needed by the Model Optimizer to convert and the Inference Engine to execute the custom layer. The extension template files will be partially replaced by Python and C++ code to implement the functionality of layer as needed by the different tools.
	 - The *Model Extension Generator* will start in interactive mode and prompt us with questions about the custom layer to be generated.
	 - Thus the models will be generated.
 - **Using The Model Optimizer To Generate The Custom Layers :**
	 - We will now use the generated extractor and operation extensions with the Model Optimizer to generate the model IR files needed by the Inference Engine. The steps covered are:
		1.  Edit the extractor extension template file.(As Per Our Needs)
		2.  Edit the operation extension template file.(As Per Our Needs)
		3.  Generate the Model IR Files.(giving arguments of input files, output files and extensions from open vino toolkit.)
	- After Executing The Model is generated with success message and there will be two files generated namely ***`model.xml`*** and ***`model.bin`***
 - **IE Custom Layer Implementation for the Intel®  CPU :** 
	 - We will now use the generated CPU extension with the Inference Engine to execute the custom layer on the CPU. The steps are:
		1.  Edit the CPU extension template files.
		2.  Compile the CPU extension library.
		3.  Execute the Model with the custom layer.
	- After Executing The Build target is created with custom layer indicating 100% completion of processes successfully.
 - **Execute the Model with the Custom Layer :** 
	 - Now we can easily execute our model using c++ sample or python sample.
	 - ***Vola ! We have now implemented a custom layer with the Intel® Distribution of OpenVINO™ Toolkit.***

##### OR IN SIMPLE STEPS :
- **Step 1: Generate:**  Use the Model Extension Generator to generate the Custom Layer Template Files.
- **Step 2: Edit:**  Edit the Custom Layer Template Files as necessary to create the specialized Custom Layer Extension Source Code.
- **Step 3: Specify:**  Specify the custom layer extension locations to be used by the Model Optimizer or Inference Engine.

**Some of the potential reasons for handling custom layers are as :**
 - *Imagine If a device doesn't support a particular layer, an alternative or best approach is to create a new custom layer which will target an additional device using the hetero plugin. The Heterogeneous Plugin may be used to run an inference model on multiple devices allowing the unsupported layers on one device to "fallback" to run on another device (e.g., CPU) that does support those layers that's why we use custom layers.*

  

## Comparing Model Performance

  

**My method(s) to compare models before and after conversion to Intermediate Representations were  as:**

 - **The difference between model accuracy pre- and post-conversion was :**
	 - Model 1: *ssd_mobilenet_v2_coco_2018_03_29*
		 - PRE : 
			 - 72%
		- POST :
			- 67%
	 - Model 2: *ssd_inception_v2_coco_2018_01_28*
		 - PRE :
			 - 73
		- POST :
			- 65%
	 - Model 3: *yolov3*
		 - PRE :
			 - 78%
		- POST :
			- 20%
	 - Model 4: *person-detection-retail-0013*
		*- PRE-TRAINED MODEL : 88.62%*
   
  - **The size of the model pre- and post-conversion was :**
	  - Model 1: *ssd_mobilenet_v2_coco_2018_03_29*
		 - PRE :
			 - ~ 66.5 mega bytes
		- POST :
			- ~ 64.2 mega bytes
	 - Model 2: *ssd_inception_v2_coco_2018_01_28*
		 - PRE :
			 - ~ 97.3 mega bytes
		- POST :
			- ~ 95.4 mega bytes
	 - Model 3: *yolov3*
		 - PRE :
			 - ~ 237 mega bytes
		- POST :
			- ~ 236 mega bytes
	 - Model 4: *person-detection-retail-0013*
		*- PRE-TRAINED MODEL : ~ 1.52 mega bytes*
   
  - **The inference time of the model pre- and post-conversion was :**
	  - Model 1: *ssd_mobilenet_v2_coco_2018_03_29*
		 - PRE :
			 - ~ 60 ms
		- POST :
			- ~ 68 ms
	 - Model 2: *ssd_inception_v2_coco_2018_01_28*
		 - PRE :
			 - ~ 120 ms
		- POST :
			- ~ 154 ms
	 - Model 3: *yolov3*
		 - PRE :
			 - ~ 51 ms
		- POST :
			- ~ 1009+ ms
	 - Model 4: *person-detection-retail-0013*
		*- PRE-TRAINED MODEL : ~ 44 ms*

  

## Assess Model Use Cases

  

- **Some of the potential use cases of the people counter app are as :**
		- *Use in grocery stores to predict daily customers and combining with other modules to catch thieves.*
		- *Use in schools to make an average attending students list, Like how many enter in the school and they should have exit the approximate same number of students when leaving school*

- **Each of these use cases would be useful because they help in gathering the real time data to catch and improve our mistakes done on the daily basis,**

  

## Assess Effects on End User Needs

  

- **Lighting, model accuracy, and camera focal length/image size have different effects on a deployed edge model. The potential effects of each of these are as follows :**
	- The absence of lighting can reduce the chance of detection of object by the model.
	- The model accuracy must be higher because if the model is trained with a large data set but it have a very poor accuracy then it may have o no use, May be the data set is small but the accuracy is high then the model might be very useful.
	- I think image size may have a lesser effect on the accuracy of the model because the model is trained with very low sizes images then it may have to detect the object , that's why it may not be much dependent of the image size.
  

## Model Research

  

[This heading is only required if a suitable model was not found after trying out at least three different models. However, you may also use this heading to detail how you converted a successful model.]

  

In investigating potential people counter models, I tried each of the following three models:

**- Model 1: *ssd_mobilenet_v2_coco_2018_03_29***

- [Model Source : [link to model](http://download.tensorflow.org/models/object_detection/ssd_mobilenet_v2_coco_2018_03_29.tar.gz)]

- I converted the model to an Intermediate Representation with the following arguments
		- `python /opt/intel/openvino/deployment_tools/model_optimizer/mo.py --input_model frozen_inference_graph.pb --tensorflow_object_detection_api_pipeline_config pipeline.config --reverse_input_channels --tensorflow_use_custom_operations_config /opt/intel/openvino/deployment_tools/model_optimizer/extensions/front/tf/ssd_v2_support.json`

- The model was insufficient for the app because inference time is greater then the pre-trained model I used and it is miss counting the pedestrians but sometimes double counts them or even when they move it drastically increase in number of counts.

- I tried to improve the model for the app by creating a flag system if a pedestrian spends less then a 1 sec duration in an area then it may not count it but not achieved the perfect results as it was again miss counting pedestrians .

 **- Model 2: *ssd_inception_v2_coco_2018_01_28***

- [Model Source : [link to model](http://download.tensorflow.org/models/object_detection/ssd_inception_v2_coco_2018_01_28.tar.gz)]

- I converted the model to an Intermediate Representation with the following arguments
	- `python /opt/intel/openvino/deployment_tools/model_optimizer/mo.py --input_model frozen_inference_graph.pb --tensorflow_object_detection_api_pipeline_config pipeline.config --reverse_input_channels --tensorflow_use_custom_operations_config /opt/intel/openvino/deployment_tools/model_optimizer/extensions/front/tf/ssd_v2_support.json`

- The model was insufficient for the app because it is miss counting the pedestrians but sometimes double counts them or even when they move, it drastically increase in number of counts. It is detects a pedestrian then blinking continuously but if we increase the threshold it is detecting table,  book and other useless objects which have no use.

- I tried to improve the model for the app by creating a flag system if a pedestrian spends less then a 1 sec duration in an area then it may not count it but not achieved the perfect results as it was again miss some pedestrians when they move or rotate a little.

 **- Model 3: *yolov3***
 
- [Model Source : [link to model](https://drive.google.com/uc?export=download&id=1oPeItBS5HxQLOADpBAVply-Pvw0FUd5Q)]

- I converted the model to an Intermediate Representation with the following arguments
		- `python /opt/intel/openvino/deployment_tools/model_optimizer/mo.py --input_model frozen_yolo_v3.pb --tensorflow_use_custom_operations_config /opt/intel/openvino/deployment_tools/model_optimizer/extensions/front/tf/yolo_v3.json --batch 1`

- The model was insufficient for the app because it is detecting more objects at a same time as we are increasing the threshold of the program.I made it to count only a object have certain height in a frame but it works for one input image or video but for other videos it may not work, Thus we need to change it every time and it is also miss counts the objects at some points.

- I tried to improve the model for the app by not count such objects but not achieved in creating a one. We need to reinvented the wheel and needs to be properly calculate the size of a specific object.