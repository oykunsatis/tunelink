import { Device, Observable, Application } from '@nativescript/core';

export interface StreamingServiceInfo {
  name: string;
  isInstalled: boolean;
  canDetectNowPlaying: boolean;
}

export interface NowPlayingTrack {
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  service: string;
  timestamp: string;
}

class StreamingServiceImpl extends Observable {
  private static instance: StreamingServiceImpl;
  private pollInterval: any;
  private currentTrack: NowPlayingTrack | null = null;

  private constructor() {
    super();
    this.startBackgroundMonitoring();
  }

  static getInstance(): StreamingServiceImpl {
    if (!StreamingServiceImpl.instance) {
      StreamingServiceImpl.instance = new StreamingServiceImpl();
    }
    return StreamingServiceImpl.instance;
  }

  private async checkNowPlaying(): Promise<void> {
    try {
      if (Device.os === 'iOS') {
        // On iOS, we would use:
        // - MPNowPlayingInfoCenter.defaultCenter().nowPlayingInfo
        // - MPRemoteCommandCenter for controls
        // This requires proper entitlements and permissions
      } else if (Device.os === 'Android') {
        // On Android, we would use:
        // - MediaSession API
        // - NotificationListenerService
        // This requires proper permissions in AndroidManifest.xml
      }

      // For demo purposes, we'll simulate a track
      const mockTrack = {
        title: "Simulation Track",
        artist: "Demo Artist",
        album: "Demo Album",
        albumArt: "https://via.placeholder.com/300",
        service: Device.os === 'iOS' ? 'Apple Music' : 'Spotify',
        timestamp: new Date().toISOString()
      };

      if (JSON.stringify(mockTrack) !== JSON.stringify(this.currentTrack)) {
        this.currentTrack = mockTrack;
        this.notify({
          eventName: 'trackChanged',
          object: this,
          data: mockTrack
        });
      }
    } catch (error) {
      console.error('Error checking now playing:', error);
    }
  }

  private startBackgroundMonitoring(): void {
    // Check every 2 seconds for changes
    this.pollInterval = setInterval(() => {
      this.checkNowPlaying();
    }, 2000);

    // Clean up on app suspend
    Application.on(Application.suspendEvent, () => {
      this.stopBackgroundMonitoring();
    });

    // Resume monitoring when app resumes
    Application.on(Application.resumeEvent, () => {
      this.startBackgroundMonitoring();
    });
  }

  public stopBackgroundMonitoring(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  }

  public getCurrentTrack(): NowPlayingTrack | null {
    return this.currentTrack;
  }

  public async getInstalledServices(): Promise<StreamingServiceInfo[]> {
    // In a real app, we would check if these apps are actually installed
    return [
      {
        name: 'Spotify',
        isInstalled: true,
        canDetectNowPlaying: true
      },
      {
        name: 'Apple Music',
        isInstalled: Device.os === 'iOS',
        canDetectNowPlaying: Device.os === 'iOS'
      },
      {
        name: 'YouTube Music',
        isInstalled: true,
        canDetectNowPlaying: Device.os === 'Android'
      }
    ];
  }
}

export const StreamingService = StreamingServiceImpl.getInstance();