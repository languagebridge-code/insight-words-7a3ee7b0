export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      analytics_daily: {
        Row: {
          classroom_id: string
          created_at: string
          hourly_usage: Json | null
          id: string
          language_pairs: Json | null
          session_date: string
          tier1_count: number | null
          tier2_count: number | null
          tier3_count: number | null
          total_characters: number | null
          translation_count: number | null
          updated_at: string
        }
        Insert: {
          classroom_id: string
          created_at?: string
          hourly_usage?: Json | null
          id?: string
          language_pairs?: Json | null
          session_date?: string
          tier1_count?: number | null
          tier2_count?: number | null
          tier3_count?: number | null
          total_characters?: number | null
          translation_count?: number | null
          updated_at?: string
        }
        Update: {
          classroom_id?: string
          created_at?: string
          hourly_usage?: Json | null
          id?: string
          language_pairs?: Json | null
          session_date?: string
          tier1_count?: number | null
          tier2_count?: number | null
          tier3_count?: number | null
          total_characters?: number | null
          translation_count?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_daily_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "classrooms"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          classroom_id: string | null
          created_at: string
          event_name: string
          extension_version: string | null
          id: number
          properties: Json | null
          session_id: string
          teacher_email: string | null
          timestamp: string
          user_id: string
        }
        Insert: {
          classroom_id?: string | null
          created_at?: string
          event_name: string
          extension_version?: string | null
          id?: number
          properties?: Json | null
          session_id: string
          teacher_email?: string | null
          timestamp?: string
          user_id: string
        }
        Update: {
          classroom_id?: string | null
          created_at?: string
          event_name?: string
          extension_version?: string | null
          id?: number
          properties?: Json | null
          session_id?: string
          teacher_email?: string | null
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "classrooms"
            referencedColumns: ["id"]
          },
        ]
      }
      app_config: {
        Row: {
          created_at: string | null
          id: string
          key: string
          value: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          value?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          value?: string | null
        }
        Relationships: []
      }
      classrooms: {
        Row: {
          classroom_code: string
          created_at: string
          deployment_type: string
          extension_code: string | null
          id: string
          name: string
          teacher_id: string
          trial_end_date: string | null
          trial_start_date: string | null
        }
        Insert: {
          classroom_code: string
          created_at?: string
          deployment_type?: string
          extension_code?: string | null
          id?: string
          name: string
          teacher_id: string
          trial_end_date?: string | null
          trial_start_date?: string | null
        }
        Update: {
          classroom_code?: string
          created_at?: string
          deployment_type?: string
          extension_code?: string | null
          id?: string
          name?: string
          teacher_id?: string
          trial_end_date?: string | null
          trial_start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classrooms_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          school: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          school?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          school?: string | null
          status?: string | null
        }
        Relationships: []
      }
      district_admins: {
        Row: {
          created_at: string
          district_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          district_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          district_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "district_admins_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      districts: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          subscribed: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          subscribed?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          subscribed?: boolean | null
        }
        Relationships: []
      }
      pilot_applications: {
        Row: {
          created_at: string | null
          email: string
          heard_from: string | null
          id: string
          languages: string | null
          name: string
          num_students: number
          phone: string | null
          role: string
          school_name: string
          status: string | null
          timeline: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          heard_from?: string | null
          id?: string
          languages?: string | null
          name: string
          num_students: number
          phone?: string | null
          role: string
          school_name: string
          status?: string | null
          timeline?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          heard_from?: string | null
          id?: string
          languages?: string | null
          name?: string
          num_students?: number
          phone?: string | null
          role?: string
          school_name?: string
          status?: string | null
          timeline?: string | null
        }
        Relationships: []
      }
      schools: {
        Row: {
          building_code: string | null
          created_at: string
          district_id: string
          id: string
          name: string
        }
        Insert: {
          building_code?: string | null
          created_at?: string
          district_id: string
          id?: string
          name: string
        }
        Update: {
          building_code?: string | null
          created_at?: string
          district_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "schools_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          created_at: string
          email: string
          grade_level: string | null
          id: string
          name: string
          school_id: string
          teacher_code: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          grade_level?: string | null
          id?: string
          name: string
          school_id: string
          teacher_code?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          grade_level?: string | null
          id?: string
          name?: string
          school_id?: string
          teacher_code?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teachers_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_analytics: {
        Row: {
          created_at: string
          id: string
          languages_used: Json | null
          session_date: string
          student_sessions: number | null
          talk_to_teacher_uses: number | null
          teacher_id: string
          total_session_minutes: number | null
          translation_count: number | null
          vocabulary_lookups: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          languages_used?: Json | null
          session_date?: string
          student_sessions?: number | null
          talk_to_teacher_uses?: number | null
          teacher_id: string
          total_session_minutes?: number | null
          translation_count?: number | null
          vocabulary_lookups?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          languages_used?: Json | null
          session_date?: string
          student_sessions?: number | null
          talk_to_teacher_uses?: number | null
          teacher_id?: string
          total_session_minutes?: number | null
          translation_count?: number | null
          vocabulary_lookups?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_analytics_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_classroom_code: { Args: never; Returns: string }
      get_teacher_district: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_district_admin: {
        Args: { _district_id: string; _user_id: string }
        Returns: boolean
      }
      upsert_analytics_daily: {
        Args: {
          p_characters?: number
          p_classroom_id: string
          p_hour?: number
          p_lang_pair?: string
          p_session_date: string
          p_tier?: number
          p_translation_count?: number
        }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "district_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user", "district_admin"],
    },
  },
} as const
