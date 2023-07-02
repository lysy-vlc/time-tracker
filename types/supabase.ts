export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      duration_options: {
        Row: {
          created_at: string | null
          duration_sec: number | null
          id: number
        }
        Insert: {
          created_at?: string | null
          duration_sec?: number | null
          id?: number
        }
        Update: {
          created_at?: string | null
          duration_sec?: number | null
          id?: number
        }
        Relationships: []
      }
      interval_options: {
        Row: {
          created_at: string | null
          duration: number | null
          id: number
        }
        Insert: {
          created_at?: string | null
          duration?: number | null
          id?: number
        }
        Update: {
          created_at?: string | null
          duration?: number | null
          id?: number
        }
        Relationships: []
      }
      intervals: {
        Row: {
          created_at: string | null
          finished_at: string | null
          id: string
          task_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          finished_at?: string | null
          id?: string
          task_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          finished_at?: string | null
          id?: string
          task_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intervals_task_id_fkey"
            columns: ["task_id"]
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intervals_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      task_types: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          brake_interval: number | null
          created_at: string | null
          duration: number | null
          id: string
          is_finished: boolean | null
          name: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          brake_interval?: number | null
          created_at?: string | null
          duration?: number | null
          id?: string
          is_finished?: boolean | null
          name?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          brake_interval?: number | null
          created_at?: string | null
          duration?: number | null
          id?: string
          is_finished?: boolean | null
          name?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
