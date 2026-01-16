import React, { useEffect, useMemo, useState } from 'react';
import { useCompanyState } from '@/components/hooks/useCompanyState';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, PlusCircle } from 'lucide-react';

const FIELD_TYPES = [
  { value: 'text', label: 'Texte' },
  { value: 'number', label: 'Nombre' },
  { value: 'date', label: 'Date' },
  { value: 'select', label: 'Liste' },
  { value: 'checkbox', label: 'Case à cocher' }
];

const normalizeObjectName = (value) =>
  value.trim().toLowerCase().replace(/\s+/g, '_');

const parseCommaList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export default function AdminStudio() {
  const { company, customObjects, refresh } = useCompanyState();
  const queryClient = useQueryClient();
  const [selectedObjectName, setSelectedObjectName] = useState(null);
  const [objectForm, setObjectForm] = useState({
    name: '',
    label: '',
    label_plural: '',
    icon: 'Box',
    record_types: ''
  });
  const [fieldForm, setFieldForm] = useState({
    name: '',
    label: '',
    type: 'text',
    required: false,
    options: '',
    default_value: ''
  });
  const [validationForm, setValidationForm] = useState({
    name: '',
    description: '',
    error_message: '',
    definition: ''
  });
  const [flowForm, setFlowForm] = useState({
    name: '',
    trigger: 'on_create',
    description: ''
  });

  useEffect(() => {
    if (!selectedObjectName && customObjects.length > 0) {
      setSelectedObjectName(customObjects[0].name);
    }
  }, [customObjects, selectedObjectName]);

  const selectedObject = useMemo(
    () => customObjects.find((obj) => obj.name === selectedObjectName) || null,
    [customObjects, selectedObjectName]
  );

  const { data: fields = [] } = useQuery({
    queryKey: ['admin-fields', selectedObject?.name],
    enabled: !!selectedObject,
    queryFn: () =>
      base44.entities.CustomField.filter({ object_name: selectedObject.name })
  });

  const { data: validationRules = [] } = useQuery({
    queryKey: ['admin-validations', selectedObject?.name],
    enabled: !!selectedObject,
    queryFn: () =>
      base44.entities.ValidationRule.filter({ object_name: selectedObject.name })
  });

  const { data: flows = [] } = useQuery({
    queryKey: ['admin-flows', selectedObject?.name],
    enabled: !!selectedObject,
    queryFn: () => base44.entities.Flow.filter({ object_name: selectedObject.name })
  });

  const nextMenuOrder = useMemo(() => {
    const maxOrder = customObjects.reduce(
      (max, obj) => Math.max(max, obj.menu_order || 0),
      0
    );
    return maxOrder + 10;
  }, [customObjects]);

  const handleCreateObject = async () => {
    if (!objectForm.name || !objectForm.label) {
      return;
    }
    const normalizedName = normalizeObjectName(objectForm.name);
    const recordTypes = parseCommaList(objectForm.record_types);
    await base44.entities.CustomObject.create({
      name: normalizedName,
      label: objectForm.label,
      label_plural: objectForm.label_plural || objectForm.label,
      icon: objectForm.icon || 'Box',
      sector: company?.sector,
      menu_order: nextMenuOrder,
      record_types: recordTypes,
      is_core: false,
      is_active: true
    });
    setObjectForm({
      name: '',
      label: '',
      label_plural: '',
      icon: 'Box',
      record_types: ''
    });
    await refresh();
    setSelectedObjectName(normalizedName);
  };

  const handleUpdateObjectTypes = async () => {
    if (!selectedObject) {
      return;
    }
    const recordTypes = parseCommaList(objectForm.record_types);
    await base44.entities.CustomObject.update(selectedObject.id, {
      record_types: recordTypes
    });
    await refresh();
  };

  const handleCreateField = async () => {
    if (!selectedObject || !fieldForm.name || !fieldForm.label) {
      return;
    }
    await base44.entities.CustomField.create({
      object_name: selectedObject.name,
      name: normalizeObjectName(fieldForm.name),
      label: fieldForm.label,
      field_type: fieldForm.type,
      required: fieldForm.required,
      options: fieldForm.type === 'select' ? parseCommaList(fieldForm.options) : [],
      default_value: fieldForm.default_value || null
    });
    setFieldForm({
      name: '',
      label: '',
      type: 'text',
      required: false,
      options: '',
      default_value: ''
    });
    queryClient.invalidateQueries(['admin-fields', selectedObject.name]);
  };

  const handleCreateValidation = async () => {
    if (!selectedObject || !validationForm.name) {
      return;
    }
    await base44.entities.ValidationRule.create({
      object_name: selectedObject.name,
      name: validationForm.name,
      description: validationForm.description,
      error_message: validationForm.error_message,
      definition: validationForm.definition
    });
    setValidationForm({
      name: '',
      description: '',
      error_message: '',
      definition: ''
    });
    queryClient.invalidateQueries(['admin-validations', selectedObject.name]);
  };

  const handleCreateFlow = async () => {
    if (!selectedObject || !flowForm.name) {
      return;
    }
    await base44.entities.Flow.create({
      object_name: selectedObject.name,
      name: flowForm.name,
      trigger: flowForm.trigger,
      description: flowForm.description,
      is_active: false
    });
    setFlowForm({
      name: '',
      trigger: 'on_create',
      description: ''
    });
    queryClient.invalidateQueries(['admin-flows', selectedObject.name]);
  };

  useEffect(() => {
    if (selectedObject) {
      setObjectForm((current) => ({
        ...current,
        record_types: (selectedObject.record_types || []).join(', ')
      }));
    }
  }, [selectedObject]);

  if (!company) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Admin Studio</h1>
              <p className="text-sm text-slate-600">
                Personnalise les objets, champs et automatisations
              </p>
            </div>
          </div>
          <div className="text-sm text-slate-500">{company?.name}</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Objets</CardTitle>
            <CardDescription>Standard + personnalisés</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {customObjects.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => setSelectedObjectName(obj.name)}
                  className={`w-full text-left px-3 py-2 rounded-lg border ${
                    selectedObject?.name === obj.name
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-sm font-medium text-slate-800">
                    {obj.label_plural || obj.label}
                  </div>
                  <div className="text-xs text-slate-500">
                    {obj.is_core ? 'Standard' : 'Personnalisé'}
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <PlusCircle className="w-4 h-4" />
                Nouvel objet
              </div>
              <div className="space-y-2">
                <Label>Nom technique</Label>
                <Input
                  placeholder="ex: inscription"
                  value={objectForm.name}
                  onChange={(event) =>
                    setObjectForm({ ...objectForm, name: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Libellé</Label>
                <Input
                  placeholder="ex: Inscription"
                  value={objectForm.label}
                  onChange={(event) =>
                    setObjectForm({ ...objectForm, label: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Libellé pluriel</Label>
                <Input
                  placeholder="ex: Inscriptions"
                  value={objectForm.label_plural}
                  onChange={(event) =>
                    setObjectForm({ ...objectForm, label_plural: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Icône (nom lucide)</Label>
                <Input
                  placeholder="ex: ClipboardCheck"
                  value={objectForm.icon}
                  onChange={(event) =>
                    setObjectForm({ ...objectForm, icon: event.target.value })
                  }
                />
              </div>
              <Button className="w-full" onClick={handleCreateObject}>
                Créer l'objet
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Configuration de l'objet</CardTitle>
              <CardDescription>
                Types pour {selectedObject?.label || 'sélectionner un objet'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Label>Types (séparés par des virgules)</Label>
              <Input
                placeholder="ex: École, Financeur, Entreprise cliente"
                value={objectForm.record_types}
                onChange={(event) =>
                  setObjectForm({ ...objectForm, record_types: event.target.value })
                }
                disabled={!selectedObject}
              />
              <Button onClick={handleUpdateObjectTypes} disabled={!selectedObject}>
                Enregistrer les types
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent>
              <Tabs defaultValue="fields">
                <TabsList className="mb-4">
                  <TabsTrigger value="fields">Champs</TabsTrigger>
                  <TabsTrigger value="validations">Règles</TabsTrigger>
                  <TabsTrigger value="flows">Automations</TabsTrigger>
                </TabsList>

                <TabsContent value="fields" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nom technique</Label>
                      <Input
                        placeholder="ex: email"
                        value={fieldForm.name}
                        onChange={(event) =>
                          setFieldForm({ ...fieldForm, name: event.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Libellé</Label>
                      <Input
                        placeholder="ex: Email"
                        value={fieldForm.label}
                        onChange={(event) =>
                          setFieldForm({ ...fieldForm, label: event.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <select
                        className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm"
                        value={fieldForm.type}
                        onChange={(event) =>
                          setFieldForm({ ...fieldForm, type: event.target.value })
                        }
                      >
                        {FIELD_TYPES.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Valeur par défaut</Label>
                      <Input
                        value={fieldForm.default_value}
                        onChange={(event) =>
                          setFieldForm({ ...fieldForm, default_value: event.target.value })
                        }
                      />
                    </div>
                    {fieldForm.type === 'select' && (
                      <div className="space-y-2 md:col-span-2">
                        <Label>Options (séparées par des virgules)</Label>
                        <Input
                          placeholder="ex: Option A, Option B"
                          value={fieldForm.options}
                          onChange={(event) =>
                            setFieldForm({ ...fieldForm, options: event.target.value })
                          }
                        />
                      </div>
                    )}
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={fieldForm.required}
                        onChange={(event) =>
                          setFieldForm({ ...fieldForm, required: event.target.checked })
                        }
                      />
                      Champ obligatoire
                    </label>
                  </div>
                  <Button onClick={handleCreateField} disabled={!selectedObject}>
                    Ajouter le champ
                  </Button>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="text-sm font-medium text-slate-700 mb-2">
                      Champs existants
                    </div>
                    <div className="space-y-2">
                      {fields.length === 0 && (
                        <p className="text-sm text-slate-500">
                          Aucun champ personnalisé pour cet objet.
                        </p>
                      )}
                      {fields.map((field) => (
                        <div
                          key={field.id}
                          className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
                        >
                          <div>
                            <div className="text-sm font-medium text-slate-800">
                              {field.label}
                            </div>
                            <div className="text-xs text-slate-500">
                              {field.field_type}
                            </div>
                          </div>
                          {field.required && (
                            <span className="text-xs text-indigo-600">Obligatoire</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="validations" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nom</Label>
                    <Input
                      value={validationForm.name}
                      onChange={(event) =>
                        setValidationForm({ ...validationForm, name: event.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={validationForm.description}
                      onChange={(event) =>
                        setValidationForm({
                          ...validationForm,
                          description: event.target.value
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Message d'erreur</Label>
                    <Input
                      value={validationForm.error_message}
                      onChange={(event) =>
                        setValidationForm({
                          ...validationForm,
                          error_message: event.target.value
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Définition (expression ou JSON)</Label>
                    <Textarea
                      rows={4}
                      value={validationForm.definition}
                      onChange={(event) =>
                        setValidationForm({
                          ...validationForm,
                          definition: event.target.value
                        })
                      }
                    />
                  </div>
                  <Button onClick={handleCreateValidation} disabled={!selectedObject}>
                    Ajouter la règle
                  </Button>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="text-sm font-medium text-slate-700 mb-2">
                      Règles existantes
                    </div>
                    <div className="space-y-2">
                      {validationRules.length === 0 && (
                        <p className="text-sm text-slate-500">
                          Aucune règle définie pour cet objet.
                        </p>
                      )}
                      {validationRules.map((rule) => (
                        <div
                          key={rule.id}
                          className="rounded-lg border border-slate-200 px-3 py-2"
                        >
                          <div className="text-sm font-medium text-slate-800">
                            {rule.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {rule.description || 'Sans description'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="flows" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nom</Label>
                    <Input
                      value={flowForm.name}
                      onChange={(event) =>
                        setFlowForm({ ...flowForm, name: event.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Déclencheur</Label>
                    <select
                      className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm"
                      value={flowForm.trigger}
                      onChange={(event) =>
                        setFlowForm({ ...flowForm, trigger: event.target.value })
                      }
                    >
                      <option value="on_create">À la création</option>
                      <option value="on_update">À la mise à jour</option>
                      <option value="on_status_change">Au changement de statut</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      rows={3}
                      value={flowForm.description}
                      onChange={(event) =>
                        setFlowForm({ ...flowForm, description: event.target.value })
                      }
                    />
                  </div>
                  <Button onClick={handleCreateFlow} disabled={!selectedObject}>
                    Ajouter l'automatisation
                  </Button>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="text-sm font-medium text-slate-700 mb-2">
                      Automations existantes
                    </div>
                    <div className="space-y-2">
                      {flows.length === 0 && (
                        <p className="text-sm text-slate-500">
                          Aucune automation définie pour cet objet.
                        </p>
                      )}
                      {flows.map((flow) => (
                        <div
                          key={flow.id}
                          className="rounded-lg border border-slate-200 px-3 py-2"
                        >
                          <div className="text-sm font-medium text-slate-800">
                            {flow.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {flow.trigger}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-3">
                      Les règles et automations sont sauvegardées ici, mais pas encore
                      exécutées automatiquement.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
