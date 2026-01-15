const DEMO_STORAGE_PREFIX = 'demo-entity:';

export const demoUser = {
  id: 'demo-user',
  email: 'demo@nexa-crm.local',
  name: 'Demo User',
  role: 'admin'
};

const getStorageKey = (entityName) => `${DEMO_STORAGE_PREFIX}${entityName}`;

const readRecords = (entityName) => {
  try {
    const raw = localStorage.getItem(getStorageKey(entityName));
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn('Demo storage read failed:', error);
    return [];
  }
};

const writeRecords = (entityName, records) => {
  try {
    localStorage.setItem(getStorageKey(entityName), JSON.stringify(records));
  } catch (error) {
    console.warn('Demo storage write failed:', error);
  }
};

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `demo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const applySortAndLimit = (records, sort, limit) => {
  if (!sort) {
    return limit ? records.slice(0, limit) : records;
  }

  const isDesc = sort.startsWith('-');
  const sortField = isDesc ? sort.slice(1) : sort;
  const sorted = [...records].sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    if (aValue === bValue) {
      return 0;
    }
    if (aValue == null) {
      return isDesc ? 1 : -1;
    }
    if (bValue == null) {
      return isDesc ? -1 : 1;
    }
    return isDesc ? (aValue > bValue ? -1 : 1) : (aValue > bValue ? 1 : -1);
  });

  return limit ? sorted.slice(0, limit) : sorted;
};

const filterRecords = (records, filters = {}) => {
  const filterEntries = Object.entries(filters);
  if (filterEntries.length === 0) {
    return records;
  }
  return records.filter((record) =>
    filterEntries.every(([key, value]) => record?.[key] === value)
  );
};

const createEntityClient = (entityName) => {
  return {
    list: async (sort, limit) => {
      const records = readRecords(entityName);
      return applySortAndLimit(records, sort, limit);
    },
    filter: async (filters) => {
      const records = readRecords(entityName);
      return filterRecords(records, filters);
    },
    create: async (data) => {
      const records = readRecords(entityName);
      const now = new Date().toISOString();
      const record = {
        id: createId(),
        created_date: now,
        updated_date: now,
        ...data
      };
      records.push(record);
      writeRecords(entityName, records);
      return record;
    },
    update: async (id, data) => {
      const records = readRecords(entityName);
      const now = new Date().toISOString();
      const nextRecords = records.map((record) => {
        if (record.id !== id) {
          return record;
        }
        return {
          ...record,
          ...data,
          updated_date: now
        };
      });
      writeRecords(entityName, nextRecords);
      return nextRecords.find((record) => record.id === id) || null;
    },
    delete: async (id) => {
      const records = readRecords(entityName);
      const nextRecords = records.filter((record) => record.id !== id);
      writeRecords(entityName, nextRecords);
      return { id };
    }
  };
};

const entities = new Proxy(
  {},
  {
    get: (_target, prop) => {
      if (typeof prop !== 'string') {
        return undefined;
      }
      return createEntityClient(prop);
    }
  }
);

export const demoClient = {
  entities,
  auth: {
    me: async () => demoUser,
    logout: async () => undefined,
    redirectToLogin: async () => undefined
  },
  appLogs: {
    logUserInApp: async () => undefined
  }
};
