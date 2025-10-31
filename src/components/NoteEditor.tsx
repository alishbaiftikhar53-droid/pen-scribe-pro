import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save, X } from 'lucide-react';

interface Note {
  id?: string;
  title: string;
  content: string;
}

interface NoteEditorProps {
  note: Note | null;
  onSave: () => void;
  onCancel: () => void;
}

const NoteEditor = ({ note, onSave, onCancel }: NoteEditorProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);

    try {
      if (note?.id) {
        // Update existing note
        const { error } = await supabase
          .from('notes')
          .update({
            title: title || 'Untitled',
            content: content,
          })
          .eq('id', note.id);

        if (error) throw error;
        toast.success('Note updated');
      } else {
        // Create new note
        const { error } = await supabase
          .from('notes')
          .insert({
            user_id: user.id,
            title: title || 'Untitled',
            content: content,
          });

        if (error) throw error;
        toast.success('Note created');
      }

      onSave();
    } catch (error: any) {
      toast.error('Failed to save note');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <h2 className="text-lg font-semibold">
          {note?.id ? 'Edit Note' : 'New Note'}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div>
          <Input
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold border-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex-1">
          <Textarea
            placeholder="Start writing your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[400px] resize-none border-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground text-base leading-relaxed"
          />
        </div>
      </div>

      {/* Editor Footer */}
      <div className="p-4 border-t bg-muted/30 text-sm text-muted-foreground">
        <p>
          {content.length} characters • {content.split(/\s+/).filter(Boolean).length} words
        </p>
      </div>
    </div>
  );
};

export default NoteEditor;
