'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { DynamicFormField, FormSchema } from '@/lib/types';
import { INITIAL_FORM_SCHEMA } from '@/lib/data';

const AVAILABLE_TYPES: DynamicFormField['type'][] = [
  'text',
  'textarea',
  'email',
  'phone',
  'number',
  'date',
  'dropdown',
  'radio',
  'checkboxes',
  'file',
  'gender',
  'signature'
];

export default function FormBuilderPage() {
  const { formSchemas, saveFormSchema } = useApp();

  const [schema, setSchema] = useState<FormSchema>(
    formSchemas[0] || INITIAL_FORM_SCHEMA
  );

  // Live preview form values
  const [previewValues, setPreviewValues] = useState<Record<string, unknown>>({
    f_full_name: 'Abdullah Ibn Mas’ud',
    f_age: 16,
    f_gender: 'Brother / Male Division',
    f_qiraah_style: 'Hafs an Asim (حفص عن عاصم)'
  });

  const [showJsonModal, setShowJsonModal] = useState(false);

  // Add field helper
  const handleAddField = (type: DynamicFormField['type']) => {
    const newIdx = schema.fields.length + 1;
    const newField: DynamicFormField = {
      id: `f_${newIdx}_${type}`,
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Question`,
      placeholder: `Enter ${type}...`,
      required: false,
      options:
        type === 'dropdown' || type === 'radio' || type === 'checkboxes'
          ? ['Option 1', 'Option 2', 'Option 3']
          : undefined
    };
    setSchema((prev) => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  };

  const handleRemoveField = (id: string) => {
    setSchema((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== id)
    }));
  };

  const handlePublishVersion = () => {
    const nextVersion = schema.version + 1;
    const updated: FormSchema = {
      ...schema,
      version: nextVersion
    };
    setSchema(updated);
    saveFormSchema(updated);
  };

  // Preview form change handler
  const handlePreviewChange = (fieldId: string, val: unknown) => {
    setPreviewValues((prev) => ({
      ...prev,
      [fieldId]: val
    }));
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href="/admin" className="text-xs font-semibold hover:underline" style={{ color: 'var(--ochre)' }}>
            ← Back to Secretariat Backoffice
          </Link>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="disp text-3xl md:text-4xl font-bold">
              Zero-Code Visual Form Builder
            </h1>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold"
              style={{ background: 'var(--ochre)', color: '#FFF' }}
            >
              Schema v{schema.version}
            </span>
          </div>
          <p className="mt-1 text-xs" style={{ color: 'var(--mute)' }}>
            Design contestant registration questionnaires with 12 dynamic field types,
            conditional visibility rules, and immutable versioning.
          </p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setShowJsonModal(true)} className="btn2 text-xs">
            Export JSON Schema
          </button>
          <button onClick={handlePublishVersion} className="btn text-xs">
            Publish v{schema.version + 1} Snapshot →
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side: Field Palette & Canvas Editor */}
        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="font-bold text-sm mb-3">Add Dynamic Field</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {AVAILABLE_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleAddField(type)}
                  className="p-2 rounded-lg border text-xs font-medium hover:border-amber-600 transition-colors capitalize text-center"
                  style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}
                >
                  + {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm">Active Form Schema Fields ({schema.fields.length})</h3>
            {schema.fields.map((field, idx) => (
              <div key={field.id} className="card p-4 space-y-3" style={{ background: 'var(--card)' }}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs uppercase font-mono font-bold" style={{ color: 'var(--ochre)' }}>
                    #{idx + 1} • {field.type.toUpperCase()}
                  </span>
                  <button
                    onClick={() => handleRemoveField(field.id)}
                    className="text-xs text-red-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold block mb-0.5">Field Label</label>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSchema((prev) => ({
                          ...prev,
                          fields: prev.fields.map((f) =>
                            f.id === field.id ? { ...f, label: val } : f
                          )
                        }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded border"
                      style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold block mb-0.5">Required?</label>
                    <label className="flex items-center gap-2 text-xs mt-2">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setSchema((prev) => ({
                            ...prev,
                            fields: prev.fields.map((f) =>
                              f.id === field.id ? { ...f, required: checked } : f
                            )
                          }));
                        }}
                      />
                      <span>Mandatory Field</span>
                    </label>
                  </div>
                </div>

                {/* Conditional Logic Setting */}
                <div className="pt-2 border-t text-[11px]" style={{ borderColor: 'var(--line)', color: 'var(--mute)' }}>
                  <span>Conditional Rule: </span>
                  {field.conditionalOnField ? (
                    <span className="font-mono text-green-700 dark:text-green-400 font-semibold">
                      Visible only if {field.conditionalOnField} &lt; 18
                    </span>
                  ) : (
                    <span>Always Visible</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Split-Screen Live Form Preview */}
        <div>
          <div className="card p-6 md:p-8 sticky top-20 shadow-md">
            <div className="flex justify-between items-center pb-4 mb-5 border-b" style={{ borderColor: 'var(--line)' }}>
              <div>
                <span className="disp text-xs uppercase font-bold tracking-widest" style={{ color: 'var(--ochre)' }}>
                  Live Canvas Preview
                </span>
                <h3 className="disp text-2xl font-bold mt-0.5">{schema.title}</h3>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded border" style={{ background: 'var(--soft)' }}>
                Interactive Sandbox
              </span>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {schema.fields.map((field) => {
                // Conditional logic evaluation
                if (field.conditionalOnField) {
                  const parentVal = Number(previewValues[field.conditionalOnField]);
                  if (parentVal >= 18) {
                    return null; // Hide if 18 or older
                  }
                }

                return (
                  <div key={field.id} className="space-y-1.5 animate-in fade-in duration-150">
                    <label className="text-xs font-semibold block">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>

                    {/* Render different dynamic field types */}
                    {field.type === 'text' || field.type === 'email' || field.type === 'phone' ? (
                      <input
                        type={field.type}
                        value={(previewValues[field.id] as string) || ''}
                        onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 text-xs rounded-lg border"
                        style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                      />
                    ) : field.type === 'number' ? (
                      <div>
                        <input
                          type="number"
                          value={(previewValues[field.id] as number) || ''}
                          onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 text-xs rounded-lg border"
                          style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                        />
                        <span className="text-[10px] text-slate-500 mt-0.5 block">
                          Tip: Enter &lt; 18 to trigger conditional Guardian Consent field!
                        </span>
                      </div>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        value={(previewValues[field.id] as string) || ''}
                        onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 text-xs rounded-lg border font-serif"
                        style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                      />
                    ) : field.type === 'gender' ? (
                      <div className="flex gap-2">
                        {['Brother / Male Division', 'Sister / Female Division'].map((g) => (
                          <button
                            type="button"
                            key={g}
                            onClick={() => handlePreviewChange(field.id, g)}
                            className="chip text-xs py-1.5 flex-1 justify-center"
                            aria-pressed={previewValues[field.id] === g}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    ) : field.type === 'dropdown' ? (
                      <select
                        value={(previewValues[field.id] as string) || ''}
                        onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border"
                        style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                      >
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'checkboxes' ? (
                      <div className="p-3 rounded-lg border bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-xs">
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="mt-0.5" />
                          <span>{field.options?.[0] || field.label}</span>
                        </label>
                      </div>
                    ) : field.type === 'signature' ? (
                      <div className="p-3 rounded-lg border border-dashed text-center" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
                        <span className="font-serif italic text-base block font-bold text-slate-700 dark:text-slate-300">
                          {String(previewValues.f_full_name || 'Signature Attested')}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          Digitally Attested via SHA-256 Signature Canvas
                        </span>
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg border border-dashed text-xs text-center" style={{ color: 'var(--mute)' }}>
                        File / Upload Dropzone: Drag audio/pdf credentials here
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 border-t" style={{ borderColor: 'var(--line)' }}>
                <button type="button" className="btn w-full justify-center text-xs">
                  Submit Candidate Form (Preview Only)
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* JSON Schema Exporter Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="card max-w-xl w-full p-6 relative shadow-2xl animate-in zoom-in-95 duration-150" style={{ background: 'var(--card)' }}>
            <button
              onClick={() => setShowJsonModal(false)}
              className="absolute top-4 right-4 text-sm font-bold text-gray-400"
            >
              ✕
            </button>
            <h3 className="disp text-2xl font-bold mb-2">Exported JSON Form Schema</h3>
            <p className="text-xs mb-3" style={{ color: 'var(--mute)' }}>
              Standardized IlmFlow Dynamic Schema representation for programmatic integration.
            </p>
            <pre className="p-4 rounded-lg border text-[11px] font-mono overflow-x-auto max-h-80" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
              {JSON.stringify(schema, null, 2)}
            </pre>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setShowJsonModal(false)} className="btn text-xs">
                Close Exporter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
