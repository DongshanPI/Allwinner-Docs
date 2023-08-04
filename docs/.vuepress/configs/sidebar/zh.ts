import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/': [
    {
      text: 'Linux基础命令',
      collapsible: true,
      children: [
        '/Basic/LinuxShell/Filemanagement.md',
        '/Basic/LinuxShell/NetworkManagement.md',
        '/Basic/LinuxShell/SystemManagement.md',
        '/Basic/LinuxShell/DocumentEditing.md',
        '/Basic/LinuxShell/DiskOperation.md',
      ],
    },
    {
      text: 'MakeFile基础',
      collapsible: true,
      children: [
        '/Basic/MakeFile/01-Introduction.md',
        '/Basic/MakeFile/03-variable.md',
        '/Basic/MakeFile/04-Pattern_rules_pseudo-targets.md',
        '/Basic/MakeFile/05-function.md',
        '/Basic/MakeFile/06-examples.md',
      ],
    },
    {
      text: 'C编程语言基础',
      collapsible: true,
      children: ['/Basic/GCCManual/01-Introduction.md'],
    },
    {
      text: 'GNU工具套件',
      collapsible: true,
      children: ['/Basic/GNU/01-Introduction.md'],
    },

  ],
  '/Board/': [
  {
    text: 'V853开发板使用',
    collapsible: true,
    children: [
      '/Board/100ASK_V853-PRO/01-HardwareResources.md',
      '/Board/100ASK_V853-PRO/02-SoftwareResources.md',
      '/Board/100ASK_V853-PRO/03-StartFirstExperience.md',
      '/Board/100ASK_V853-PRO/04-BurningSystem.md',
    ],
  },
  {
    text: '东山哪吒STU使用',
    collapsible: true,
    children: [
      '/Board/DongshanNezhaSTU/01-BoardIntroduction.md',
      '/Board/DongshanNezhaSTU/02-SupportingResources.md',
      '/Board/DongshanNezhaSTU/03-QuickStart.md',
      '/Board/DongshanNezhaSTU/03-1_FlashSystem.md',
      '/Board/DongshanNezhaSTU/04-StudyPath.md',
    ],
  },
  {
    text: '100ASK_T113-PRO使用',
    collapsible: true,
    children: [
      '/Board/100ASK_T113-PRO/01-BoardIntroduction.md',
      '/Board/100ASK_T113-PRO/02-SupportingResources.md',
      '/Board/100ASK_T113-PRO/03-QuickStart.md',
      '/Board/100ASK_T113-PRO/03-1_FlashSystem.md',
      '/Board/100ASK_T113-PRO/04-SystemFunctionTest.md',
      '/Board/100ASK_T113-PRO/05-StudyPath.md',
    ],
  },
],

  '/Application/': [
    {
      text: 'eLinux应用开发环境',
      collapsible: true,
      children: [
        '/Application/LinuxEnvironmentonfiguration/01-EnvironmentalConfiguration.md',
        '/Application/LinuxEnvironmentonfiguration/02-Compile-Helloword-program.md',
      ],
    },
    {
      text: 'AI人工智能应用开发',
      collapsible: true,
      children: [
        '/Application/AIApplicationDevelopment/01-NPUDevelopmentDeployment.md',
        '/Application/AIApplicationDevelopment/02-Face-HumanoidDetection.md',
        '/Application/AIApplicationDevelopment/03-Model-transformation-toolkit.md',
        '/Application/AIApplicationDevelopment/04-yolov3ModelDeployment.md',
        '/Application/AIApplicationDevelopment/05-Lenet-TrainingToDeployment.md',
        '/Application/AIApplicationDevelopment/06-SupportOpencvFFmpeg.md',
        '/Application/AIApplicationDevelopment/07-yolov5ModelDeployment.md',
        '/Application/AIApplicationDevelopment/08-yolov5TrainCustomDatasetModel.md',
        '/Application/AIApplicationDevelopment/09-YolactModelDeploymentActualCombat.md',
        '/Application/AIApplicationDevelopment/10-MixedQuantization.md',
        '/Application/AIApplicationDevelopment/11-VIPLiteAPI-explain.md',
        '/Application/AIApplicationDevelopment/12-CommonNetworkPerformance.md',
      ],
    },
    {
      text: 'MPP多媒体框架开发',
      collapsible: true,
      children: [
        '/Application/MPPApplicationDevelopment/01-MediaProcessingPlatformConfig.md',
        '/Application/MPPApplicationDevelopment/02-MPPSampleInstructions.md',
        '/Application/MPPApplicationDevelopment/03-MPPDevelopmentGuide.md',
      ],
    },
    {
      text: 'LVGL8-UI开发',
      collapsible: true,
      children: [
        '/Application/LVGL8-UI/100ASK_T113-PRO_00-DeviceConfig.md',
        '/Application/LVGL8-UI/100ASK_T113-PRO_01-Introduction.md',
        '/Application/LVGL8-UI/100ASK_V853-PRO_00-DeviceConfig.md',
      ],
    },
    {
      text: 'FB显示开发',
      collapsible: true,
      children: [
        '/Application/GraphicLibrariesAndApplications/01_FramebufferAPP.md',
        '/Application/GraphicLibrariesAndApplications/02_ImageProcess.md',
      ],
    },
    {
      text: '网络设备开发',
      collapsible: true,
      children: [
        '/Application/06_NetworkProgram.md',
        '/Application/16_MQTT.md',
      ],
    },
    {
      text: '模块设备开发',
      collapsible: true,
      children: [
        '/Application/09_GPIOProgram.md',
        '/Application/11_PWM.md',
        '/Application/12_IIC.md',
        '/Application/10_RTC.md',
        '/Application/14_Linux_Can.md',
        '/Application/15_StoreDevice.md',
      ],
    },
    {
      text: '音视频开发',
      collapsible: true,
      children: [
        '/Application/08_AudioBoard.md',
        '/Application/07_CameraV4L2.md',
      ],
    },
  ],
  '/System/': [
    {
      text: '嵌入式Linux系统基本组成',
      collapsible: true,
      children: [
        '/System/eLinuxFramework/buildroot-training-chapter1.md',
        '/System/eLinuxFramework/buildroot-training-chapter2.md',
        '/System/eLinuxFramework/buildroot-training-chapter2-1.md',
        '/System/eLinuxFramework/buildroot-training-chapter3.md',
        '/System/eLinuxFramework/buildroot-training-chapter4.md',
        '/System/eLinuxFramework/buildroot-training-chapter5.md',
        '/System/eLinuxFramework/buildroot-training-chapter6.md',
        '/System/eLinuxFramework/buildroot-training-chapter7.md',
        '/System/eLinuxFramework/buildroot-training-chapter8.md',
        '/System/eLinuxFramework/buildroot-training-chapter9.md',
        '/System/eLinuxFramework/buildroot-training-chapter10.md',
        '/System/eLinuxFramework/buildroot-training-chapter11.md',
      ],
    },
    {
      text: 'NezhaSTU Tina-SDK使用',
      collapsible: true,
      children: ['/System/DongshanNezhaSTU/11-Tina-SDK_DevelopmentGuide'],
    },
    {
      text: 'T113-PRO Tina-SDK使用',
      collapsible: true,
      children: ['/System/Linux_SystemSoftware_DevelopmentGuide.md'],
    },
    {
      text: ' Tina-SDK 系统定制化',
      collapsible: true,
      children: ['/System/Linux_Packaging_Process_DescriptionGuide.md'],
    },
  ],
  '/Devicedriver/': [
    {
      text: 'V853-PRO设备驱动支持',
      collapsible: true,
      children: [
        '/Devicedriver/100ASK_V853-PRO/01-V853SupportRGBDisplay.md',
        '/Devicedriver/100ASK_V853-PRO/02-V853SupportMIPIDisplay.md',
        '/Devicedriver/100ASK_V853-PRO/03-v853Supportkeyinput.md',
        '/Devicedriver/100ASK_V853-PRO/04-V853SupportMicAudio..md',
        '/Devicedriver/100ASK_V853-PRO/05-V853SupportE907.md',
        '/Devicedriver/100ASK_V853-PRO/06-V853SuportCamera.md',
      ],
    },
  ],
  '/Special/': [
    {
      text: 'T113-PRO Buildroot-LTS',
      collapsible: true,
      children: [
        '/Special/Buildroot_LTS-T113/01-BoardIntroduction.md',
        '/Special/Buildroot_LTS-T113/02-SupportingResources.md',
        '/Special/Buildroot_LTS-T113/03-1_FlashSystemSpiFlash.md',
        '/Special/Buildroot_LTS-T113/03-2_FlashSystemTFCard.md',
        '/Special/Buildroot_LTS-T113/03-QuickStart.md',
        '/Special/Buildroot_LTS-T113/04-StudyPath.md',
        '/Special/Buildroot_LTS-T113/05-1_RunHelloword.md',
        '/Special/Buildroot_LTS-T113/05-2_RunHellowordDriver.md',
        '/Special/Buildroot_LTS-T113/06-ConfigHostEnv.md',
        '/Special/Buildroot_LTS-T113/07-Buildroot-SDK_DevelopmentGuide.md',
        '/Special/Buildroot_LTS-T113/08-BuildBootloader.md',
        '/Special/Buildroot_LTS-T113/09-BuildLinuxKernel.md',
        '/Special/Buildroot_LTS-T113/10-1_BuildrootSupportWifiBluetooth.md',
        '/Special/Buildroot_LTS-T113/10-BuildRootfs.md',
        '/Special/Buildroot_LTS-T113/11-StartProcessAnalysis.md',
      ],
    },
    {
      text: 'NezhaSTU Buildroot-LTS',
      collapsible: true,
      children: [
        '/Special/DongshanNezhaSTUBrLTS/06-ConfigHostEnv.md',
        '/Special/DongshanNezhaSTUBrLTS/07-Buildroot-SDK_DevelopmentGuide.md',
        '/Special/DongshanNezhaSTUBrLTS/08-BuildBootloader.md',
        '/Special/DongshanNezhaSTUBrLTS/09-BuildLinuxKernel.md',
        '/Special/DongshanNezhaSTUBrLTS/10-1_BuildrootSupportWifiBluetooth.md',
        '/Special/DongshanNezhaSTUBrLTS/10-BuildRootfs.md',
      ],
    },
    {
      text: '支持主线Linux',
      collapsible: true,
      children: ['/Special/02_ImageProcess.md'],
    },
    {
      text: 'Bootloader开发',
      collapsible: true,
      children: [
        '/Special/Linux_U-boot_DevelopmentGuide-01.md',
        '/Special/Linux_U-boot_DevelopmentGuide-02.md',
        '/Special/Linux_U-boot_DevelopmentGuide-03.md',
        '/Special/Linux_U-boot_DevelopmentGuide-04.md',
        '/Special/Linux_U-boot_DevelopmentGuide-05.md',
        '/Special/Linux_U-boot_DevelopmentGuide-06.md',
      ],
    },
  ],
}
