import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';
import { isDemoMode } from '@/lib/demo-mode';
import { demoClient, demoUser } from './demoClient';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// Create a client with authentication required
export const base44 = isDemoMode
  ? demoClient
  : createClient({
      appId,
      token,
      functionsVersion,
      serverUrl: '',
      requiresAuth: false,
      appBaseUrl
    });

export { isDemoMode, demoUser };
